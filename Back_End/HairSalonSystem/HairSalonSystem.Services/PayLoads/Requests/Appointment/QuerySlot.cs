using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Requests.Appointment
{
    public class QuerySlot
    {
        public Guid StylistId { get; set; }
        public List<Guid> ServiceId { get; set; }
        public DateTime date { get; set; }
    }
}
