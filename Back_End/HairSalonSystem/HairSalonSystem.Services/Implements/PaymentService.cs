//using Net.payOS;
//using Microsoft.Extensions.Configuration;
//using Net.payOS.Types;

//public class PaymentService
//{
//    private readonly PayOS _payOS;

//    public PaymentService(IConfiguration configuration)
//    {
//        _payOS = new PayOS(
//            configuration["Environment:PAYOS_CLIENT_ID"] ?? throw new Exception("Cannot find environment"),
//            configuration["Environment:PAYOS_API_KEY"] ?? throw new Exception("Cannot find environment"),
//            configuration["Environment:PAYOS_CHECKSUM_KEY"] ?? throw new Exception("Cannot find environment")
//        );
//    }
//    public async Task<CreatePaymentResult> CreatePaymentLink()
//    {
//        long orderCode = DateTimeOffset.Now.ToUnixTimeMilliseconds();
//        ItemData item = new ItemData("Product 1", 1, 2000);
//        List<ItemData> items = new List<ItemData> { item };

//        PaymentData paymentData = new PaymentData(
//            orderCode,
//            2000,
//            "Payment for order",
//            items,
//            "https://localhost:3000/cancel",
//            "https://localhost:3000/success"
//        );

//        CreatePaymentResult paymentLink = await _payOS.createPaymentLink(paymentData);
//        return paymentLink;
//    }

//    // Các phương thức liên quan đến thanh toán sẽ được thêm vào đây
//}
