using HairSalonSystem.Services.PayLoads.Requests.Payment;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class PaymentController : ControllerBase
{
    private readonly string clientId = "766bcdee-bfad-4759-b6c5-06b832d3ae0c"; // Thay bằng ClientId thực tế
    private readonly string apiKey = "64c78531-ef20-44eb-94ad-0f2607b4b96b"; // Thay bằng ApiKey thực tế
    private readonly string checksumKey = "1f5e80b4746f9ce239bfc31b2b093ed2e2597e723bb54aa05b403b12ff335522"; // Thay bằng ChecksumKey thực tế
    private readonly string payOsUrl = "https://api.payos.com/payment"; // URL thanh toán

    [HttpPost("pay")]
    public async Task<IActionResult> PayOrder([FromBody] Order order)
    {
        // Xây dựng dữ liệu cần gửi đến PayOs
        var paymentData = new
        {
            ClientId = clientId,
            OrderId = order.OrderId,
            Amount = order.Amount,
            Currency = order.Currency,
            Description = order.Description,
            CustomerId = order.CustomerId,
            // Thêm các trường khác nếu cần
        };

        // Tính toán checksum
        string checksum = GenerateChecksum(order); // Sửa để truyền đối tượng order

        // Thêm checksum vào dữ liệu
        var finalPaymentData = new
        {
            paymentData.ClientId,
            paymentData.OrderId,
            paymentData.Amount,
            paymentData.Currency,
            paymentData.Description,
            paymentData.CustomerId,
            Checksum = checksum
        };

        // Gửi yêu cầu thanh toán
        using (var httpClient = new HttpClient())
        {
            var jsonContent = JsonConvert.SerializeObject(finalPaymentData);
            var httpContent = new StringContent(jsonContent, Encoding.UTF8, "application/json");

            var response = await httpClient.PostAsync(payOsUrl, httpContent);
            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                return Ok(responseContent); // Trả về kết quả từ PayOs
            }
            else
            {
                return BadRequest("Thanh toán không thành công");
            }
        }
    }

    private string GenerateChecksum(Order order)
    {
        // Kết hợp các giá trị để tạo chuỗi cho checksum
        string data = $"{clientId}{order.OrderId}{order.Amount}{order.Currency}{checksumKey}";

        // Tạo hàm băm SHA256
        using (SHA256 sha256Hash = SHA256.Create())
        {
            // Chuyển đổi chuỗi thành mảng byte
            byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(data));

            // Chuyển đổi mảng byte thành chuỗi hex
            StringBuilder builder = new StringBuilder();
            foreach (var b in bytes)
            {
                builder.Append(b.ToString("x2"));
            }
            return builder.ToString(); // Trả về checksum dạng chuỗi hex
        }
    }
}
