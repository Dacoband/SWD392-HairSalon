using Net.payOS;
using Microsoft.Extensions.Configuration;
using Net.payOS.Types;
using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Interface;
using System.Net.Http;
using Newtonsoft.Json;
using HairSalonSystem.Repositories.Implement;
public class PaymentService
{
    private readonly PayOS _payOS;
    private readonly IAppointmentRepository _appointmentRepository;
    private readonly HttpClient _httpClient;

    private readonly PaymentRepository _paymentRepository;

    public PaymentService(IConfiguration configuration,IAppointmentRepository appointmentRepository, HttpClient httpClient,PaymentRepository paymentRepository)
    {
        _payOS = new PayOS(
            configuration["Environment:PAYOS_CLIENT_ID"] ?? throw new Exception("Cannot find environment"),
            configuration["Environment:PAYOS_API_KEY"] ?? throw new Exception("Cannot find environment"),
            configuration["Environment:PAYOS_CHECKSUM_KEY"] ?? throw new Exception("Cannot find environment")
        );
        _appointmentRepository = appointmentRepository;
        _httpClient = httpClient;
        _paymentRepository = paymentRepository;
    }
    public async Task<CreatePaymentResult> CreatePaymentLinkForAppointment(Guid appointmentId)
    {
        
        var appointment = await _appointmentRepository.GetAppointmentById(appointmentId);
        if (appointment == null)
        {
            throw new Exception($"Appointment với ID {appointmentId} không tồn tại.");
        }
        

        long orderCode = DateTimeOffset.Now.ToUnixTimeMilliseconds();
        ItemData item = new ItemData($"Dịch vụ cuộc hẹn {appointment.AppointmentId.ToString().Substring(0, 4)}", 1, (int)appointment.TotalPrice);
        List<ItemData> items = new List<ItemData> { item };
        string description = "Thanh";

        PaymentData paymentData = new PaymentData(
             orderCode,
             (int)appointment.TotalPrice,
             description,  
             items,
             "https://localhost:7072/api/Payment/cancel",
             "https://localhost:7072/api/Payment/success"
        );

        // Gửi yêu cầu tạo liên kết thanh toán
        var paymentResult = await _payOS.createPaymentLink(paymentData);

        // Lưu `paymentLinkId` vào Database (để dùng trong callback)
        var paymentRecord = new Payment
        {
            Id = Guid.NewGuid(),
            AppointmentId = appointmentId,
            PaymentLinkId = paymentResult.paymentLinkId, 
            Status = "created",
            Amount = appointment.TotalPrice,
            Timestamp = DateTime.UtcNow
        };
        await _paymentRepository.InsertPayment(paymentRecord);

        // Tạo một đối tượng mới với `paymentLinkId` được khởi tạo
        var updatedPaymentResult = paymentResult with { paymentLinkId = paymentResult.paymentLinkId };

        return updatedPaymentResult;
    }

    public async Task<string> GetPaymentStatus(string paymentLinkId)
    {
        // Gửi yêu cầu đến PayOS để kiểm tra trạng thái thanh toán
        var response = await _httpClient.GetAsync($"https://api.payos.com/v1/payment/status/{paymentLinkId}");
        response.EnsureSuccessStatusCode();

        var jsonResponse = await response.Content.ReadAsStringAsync();
        var paymentStatus = JsonConvert.DeserializeObject<PaymentStatusResponse>(jsonResponse);

        return paymentStatus.Status; // Trả về trạng thái thanh toán (e.g., "success", "pending", ...)
    }
    public class PaymentStatusResponse
    {
        [JsonProperty("status")]
        public string Status { get; set; }
    }

}
