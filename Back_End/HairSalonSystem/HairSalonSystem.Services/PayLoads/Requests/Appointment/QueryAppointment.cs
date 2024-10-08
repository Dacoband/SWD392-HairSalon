using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Requests.Appointment
{
    public class QueryAppointment
    {
        public Guid? CustomerId { get; set; }
        public Guid? StylistId { get; set; }
        public int? Status { get; set; }
        public Guid? BranchId { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public int? pageIndex { get; set; }
        public int? pageSize { get; set; }
    }
}
