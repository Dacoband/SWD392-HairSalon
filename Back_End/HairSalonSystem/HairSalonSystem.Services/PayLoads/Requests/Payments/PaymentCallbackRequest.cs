using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Requests.Payments
{
    public class PaymentCallbackRequest
    {
        public Guid AppointmentId { get; set; }
        public string PaymentLinkId { get; set; }
    }


}
