using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Requests.OffSchedule
{
    public class OffScheduleQuery
    {
        public Guid? BranchId { get; set; }
        public Guid? StylistId { get; set; }
        public DateTime StartTime { get; set; } = DateTime.Now;
        public int? GetBy { get; set; } = 0;
        public bool DelFlg { get; set; } = true;
    }
}
