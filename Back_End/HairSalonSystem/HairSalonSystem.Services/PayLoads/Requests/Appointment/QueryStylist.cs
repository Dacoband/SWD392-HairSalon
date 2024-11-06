using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Requests.Appointment
{
    public class QueryStylist
    {
        public DateTime StartTime {  get; set; }
        public List<Guid> ServiceIds { get; set; }
        public Guid BranchId {  get; set; }
    }
}
