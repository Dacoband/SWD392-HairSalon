using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Requests.Cancellation
{
    public class CreateCancellationReq
    {
        public Guid AppointmetId { get; set; }
        public string Reason { get; set; }
    }
}
