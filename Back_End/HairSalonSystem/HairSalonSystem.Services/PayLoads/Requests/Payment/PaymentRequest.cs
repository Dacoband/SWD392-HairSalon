using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Requests.Payment
{
    public class PaymentRequest
    {
        public string MerchantId { get; set; }
        public string ApiKey { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; }
        public string OrderId { get; set; }
        public string ReturnUrl { get; set; }
    }

}
