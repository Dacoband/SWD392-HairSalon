using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Implement;
using HairSalonSystem.Repositories.Interface;
using HairSalonSystem.Services.PayLoads.Requests.Payment;
using HairSalonSystem.Services.PayLoads.Requests.Payments;
using Microsoft.AspNetCore.Mvc;
using Net.payOS;
using Newtonsoft.Json;
using System.Net.Http;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class PaymentController : ControllerBase
{
    private readonly PaymentService _paymentService;
    private readonly IAppointmentRepository _appointmentRepository;
    private readonly HttpClient _httpClient; // Đảm bảo bạn đã khởi tạo HttpClient]
    private readonly PaymentRepository _paymentRepository;

    public PaymentController(PaymentService paymentService, IAppointmentRepository appointmentRepository, HttpClient httpClient,PaymentRepository paymentRepository)
    {
        _paymentService = paymentService;
        _appointmentRepository = appointmentRepository;
        _httpClient = httpClient;
        _paymentRepository = paymentRepository;
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
    public IActionResult PaymentSuccess([FromQuery] string id, [FromQuery] string status)
    {
        // Xử lý logic cho thanh toán thành công
        // Ví dụ: cập nhật trạng thái thanh toán trong DB
        return Ok(new { message = "Thanh toán thành công", id, status });
    }

    [HttpGet("cancel")]
    public async Task<IActionResult> CancelPayment(
     [FromQuery] string id,
     [FromQuery] string status,
     [FromQuery] string code,
     [FromQuery] string cancel,
     [FromQuery] string orderCode)
    {
        // Log giá trị của id
        Console.WriteLine($"Received PaymentLinkId: {id}");

        var payment = await _paymentRepository.GetPaymentByPaymentLinkId(id);

        if (payment == null)
        {
            return NotFound(new { message = "Không tìm thấy thanh toán với PaymentLinkId này" });
        }

        if (status == "CANCELLED" && cancel == "true")
        {
            _appointmentRepository.UpdateAppointmentStatus(payment.AppointmentId, 1);
            return Ok(new { message = "Thanh toán đã bị hủy", id, status });
        }
        else { 
        _appointmentRepository.UpdateAppointmentStatus(payment.AppointmentId, 2);
         }

        return BadRequest(new { message = "Yêu cầu không hợp lệ" });
    }



}
