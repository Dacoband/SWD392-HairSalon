using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Implement;
using HairSalonSystem.Repositories.Interface;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.PayLoads.Requests.Emails;
using HairSalonSystem.Services.PayLoads.Requests.Payment;
using HairSalonSystem.Services.PayLoads.Requests.Payments;
using Microsoft.AspNetCore.Mvc;
using Net.payOS;
using Newtonsoft.Json;
using System.Net.Http;
using System.Threading.Channels;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class PaymentController : ControllerBase
{
    private readonly PaymentService _paymentService;
    private readonly IAppointmentRepository _appointmentRepository;
    private readonly HttpClient _httpClient; // Đảm bảo bạn đã khởi tạo HttpClient]
    private readonly PaymentRepository _paymentRepository;
    private readonly IEmailService _emailService;
    private readonly IAccountRepository _accountRepository;
    private readonly IMemberRepository _memberRepository;

    public PaymentController(PaymentService paymentService, IAppointmentRepository appointmentRepository, HttpClient httpClient,PaymentRepository paymentRepository,IEmailService emailService,IAccountRepository accountRepository,IMemberRepository memberRepository)
    {
        _paymentService = paymentService;
        _appointmentRepository = appointmentRepository;
        _httpClient = httpClient;
        _paymentRepository = paymentRepository;
        _emailService = emailService;
        _accountRepository = accountRepository;
        _memberRepository = memberRepository;
    }

    [HttpPost("create-payment-link")]
    public async Task<IActionResult> CreatePaymentLink([FromBody] Guid appointmentId)
    {
        try
        {
            var paymentResult = await _paymentService.CreatePaymentLinkForAppointment(appointmentId);

            // Trả về `paymentLinkId` và `checkoutUrl`
            return Ok(new { paymentLink = paymentResult.checkoutUrl, paymentLinkId = paymentResult.paymentLinkId });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }


    //[HttpPost("payment/callback")]
    //public async Task<IActionResult> PaymentCallback([FromBody] PaymentCallbackRequest callbackRequest)
    //{
    //    // Lấy ID của cuộc hẹn từ callbackRequest
    //    var appointmentId = callbackRequest.AppointmentId;

    //    // Kiểm tra xem cuộc hẹn có tồn tại không
    //    var appointment = await _appointmentRepository.GetAppointmentById(appointmentId);
    //    if (appointment == null)
    //    {
    //        return NotFound(new { error = $"Cuộc hẹn với ID {appointmentId} không tồn tại." });
    //    }

    //    // Gửi yêu cầu kiểm tra trạng thái thanh toán đến PayOS
    //    var paymentStatus = await _paymentService.GetPaymentStatus(callbackRequest.PaymentLinkId);

    //    // Kiểm tra trạng thái thanh toán và cập nhật nếu thanh toán thành công
    //    if (paymentStatus == "success")
    //    {
    //        appointment.Status = 5; // 5: completed
    //        await _appointmentRepository.UpdateAppointment(appointment);
    //        return Ok("Cập nhật trạng thái cuộc hẹn thành công.");
    //    }

    //    // Nếu thanh toán không thành công, trả về lỗi
    //    return BadRequest("Thanh toán không thành công hoặc chưa được hoàn tất.");
    //}
    [HttpPost("payment/callback")]
    public async Task<IActionResult> PaymentCallback([FromBody] PaymentCallbackRequest callbackRequest)
    {
        Guid appointmentId = callbackRequest.AppointmentId;
        var paymentLinkId = callbackRequest.PaymentLinkId;

        // Kiểm tra trạng thái thanh toán từ PayOS
        var paymentStatus = await _paymentService.GetPaymentStatus(paymentLinkId);

        if (paymentStatus == "success")
        {
            // Lưu thông tin thanh toán vào MongoDB
            var payment = new Payment
            {
                AppointmentId = appointmentId,
                PaymentLinkId = paymentLinkId,
                Timestamp = DateTime.UtcNow
            };
            await _paymentRepository.InsertPayment(payment);

            // Cập nhật trạng thái cuộc hẹn thành 5 (completed)
            var appointment = await _appointmentRepository.GetAppointmentById(appointmentId);
            if (appointment == null)
            {
                return NotFound($"Cuộc hẹn với ID {appointmentId} không tồn tại.");
            }
            appointment.Status = 5;
            await _appointmentRepository.UpdateAppointment(appointment);

            return Ok("Thanh toán thành công và trạng thái cuộc hẹn đã được cập nhật.");
        }

        return BadRequest("Thanh toán không thành công.");
    }
    [HttpGet("payment-result")]
    public IActionResult PaymentResult([FromQuery] string id, [FromQuery] string status)
    {
        if (status == "CANCELLED")
        {
            // Xử lý logic cho hủy thanh toán
            return Ok(new { message = "Thanh toán đã bị hủy", id, status });
        }
        else
        {
            // Xử lý logic cho thanh toán thành công
            return Ok(new { message = "Thanh toán thành công", id, status });
        }
    }
    [HttpGet("success")]
    public async Task<IActionResult> PaymentSuccess([FromQuery] string id, [FromQuery] string status)
    {
        // Log the PaymentLinkId value
        Console.WriteLine($"Received PaymentLinkId: {id}");

        // Check if payment was successful
        if (status != "PAID")
        {
            return BadRequest(new { message = "Trạng thái thanh toán không hợp lệ hoặc chưa được thanh toán.", id, status });
        }

        // Retrieve the payment information using the PaymentLinkId
        var payment = await _paymentRepository.GetPaymentByPaymentLinkId(id);

        if (payment == null)
        {
            return NotFound(new { message = "Không tìm thấy thông tin thanh toán với PaymentLinkId này" });
        }

        // Retrieve the appointment details using AppointmentId from payment
        var appointment = await _appointmentRepository.GetAppointmentById(payment.AppointmentId);
        if (appointment == null)
        {
            return NotFound(new { message = $"Cuộc hẹn với ID {payment.AppointmentId} không tồn tại." });
        }

        // Update the appointment status to 2 (indicating successful payment)
        appointment.Status = 2;
        await _appointmentRepository.UpdateAppointment(appointment);

        // Send email notification for successful payment
        var mem = await _memberRepository.GetMemberById(appointment.CustomerId);
        var account = await _accountRepository.GetAccountById(mem.AccountId);
        if (account != null)
        {
            var emailSendingFormat = new EmailSendingFormat
            {
                member = account.Email,
                Subject = "Your Payment Was Successful",
                Information = GenerateSuccessEmailBody(appointment)
            };

            await _emailService.SendEmail(emailSendingFormat);
        }
        else
        {
            return NotFound(new { message = "Không tìm thấy tài khoản với CustomerId này" });
        }

        return Ok(new { message = "Thanh toán thành công, trạng thái cuộc hẹn đã được cập nhật và email xác nhận đã được gửi.", id, status });
    }

    // Hàm tạo nội dung email xác nhận thanh toán thành công
    private string GenerateSuccessEmailBody(Appointment appointment)
    {
        return $@"
            <html>
            <body style='font-family: Arial, sans-serif;'>
                <h2 style='color: #4CAF50;'>Payment Success Notification</h2>
                <p>Dear {appointment.CustomerId},</p>
                <p>We would like to inform you that your payment for the appointment scheduled on 
                   <strong>{appointment.InsDate.ToString("MMMM dd, yyyy")}</strong> at 
                   <strong>{appointment.EndTime}</strong> has been successfully processed.</p>
                <p>If you have any questions or would like to reschedule, please contact us.</p>
                <br>
                <p>Best Regards,<br>Your Hair Salon Team</p>
            </body>
            </html>";
    }



    [HttpGet("cancel")]
    public async Task<IActionResult> CancelPayment(
           [FromQuery] string id,
           [FromQuery] string status,
           [FromQuery] string code,
           [FromQuery] string cancel,
           [FromQuery] string orderCode)
    {
        // Log the PaymentLinkId value
        Console.WriteLine($"Received PaymentLinkId: {id}");

        // Retrieve payment information using the PaymentLinkId
        var payment = await _paymentRepository.GetPaymentByPaymentLinkId(id);

        if (payment == null)
        {
            return NotFound(new { message = "Không tìm thấy thanh toán với PaymentLinkId này" });
        }

        // Update the appointment status to 1 if payment was cancelled
        if (status == "CANCELLED")
        {
            await _appointmentRepository.UpdateAppointmentStatus(payment.AppointmentId, 1);

            // Send email notification
            var appointment = await _appointmentRepository.GetAppointmentById(payment.AppointmentId);
            if (appointment != null)
            {
                 var mem = await _memberRepository.GetMemberById(appointment.CustomerId);
                var account = await _accountRepository.GetAccountById(mem.AccountId);
                if (account != null)
                {
                    var emailSendingFormat = new EmailSendingFormat
                    {
                        member = account.Email,
                        Subject = "Your Payment Has Been Cancelled",
                        Information = GenerateCancellationEmailBody(appointment)
                    };

                    await _emailService.SendEmail(emailSendingFormat);
                }
                else
                {
                    // Handle the case where the account is not found
                    return NotFound(new { message = "Không tìm thấy tài khoản với CustomerId này" });
                }
            }

            return Ok(new { message = "Thanh toán đã bị hủy và email đã được gửi", id, status });
        }

        return BadRequest(new { message = "Yêu cầu không hợp lệ" });
    }

    
    private string GenerateCancellationEmailBody(Appointment appointment)
    {
        return $@"
                <html>
                <body style='font-family: Arial, sans-serif;'>
                    <h2 style='color: #FF5733;'>Payment Cancellation Notice</h2>
                    <p>Dear {appointment.CustomerId},</p>
                    <p>We would like to inform you that your payment for the appointment scheduled on 
                       <strong>{appointment.InsDate.ToString("MMMM dd, yyyy")}</strong> at 
                       <strong>{appointment.EndTime}</strong> has been cancelled.</p>
                    <p>If you have any questions or would like to reschedule, please contact us.</p>
                    <br>
                    <p>Best Regards,<br>Your Hair Salon Team</p>
                </body>
                </html>";
    }
    
}
