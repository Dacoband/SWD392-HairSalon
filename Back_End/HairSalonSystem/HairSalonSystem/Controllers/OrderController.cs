using HairSalonSystem.Services.PayLoads.Requests.Payment;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly HttpClient _httpClient;

    public OrderController(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    // Tạo đơn hàng giả
    [HttpPost("create")]
    public IActionResult CreateOrder([FromBody] Order order)
    {
        // Giả lập tạo đơn hàng và trả về thông tin đơn hàng
        var createdOrder = new Order
        {
            OrderId = Guid.NewGuid().ToString(),
            Amount = order.Amount,
            Currency = order.Currency
        };
        return Ok(createdOrder);
    }

    // Thanh toán đơn hàng
    [HttpPost("pay")]
    public async Task<IActionResult> PayOrder([FromBody] Order order)
    {
        var paymentRequest = new
        {
            MerchantId = "your_merchant_id", // Điền thông tin từ PayOs
            ApiKey = "your_api_key",
            Amount = order.Amount,
            Currency = order.Currency,
            OrderId = order.OrderId,
            ReturnUrl = "https://yourwebsite.com/payment/callback"
        };

        var json = JsonConvert.SerializeObject(paymentRequest);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        // Thực hiện yêu cầu thanh toán tới PayOs
        var response = await _httpClient.PostAsync("https://api.payos.com/payment", content);

        if (response.IsSuccessStatusCode)
        {
            var responseData = await response.Content.ReadAsStringAsync();
            return Ok(responseData); // Trả về kết quả thanh toán
        }

        return BadRequest("Payment failed");
    }
}

