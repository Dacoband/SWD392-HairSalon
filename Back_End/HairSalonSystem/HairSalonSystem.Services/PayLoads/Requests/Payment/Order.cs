using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Requests.Payment
{
    public class Order
    {
        public string? OrderId { get; set; }
        public decimal? Amount { get; set; }
        public string? Currency { get; set; } // Ví dụ: "VND"
        public string? Description { get; set; }
        public string? CustomerId { get; set; } // ID của khách hàng
    }


}
