using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Requests.OffSchedule
{
    public class CreateOffScheduleRequest
    {
        public DateOnly OffDate {  get; set; }
        public int OffSlot { get; set; }    
    }
}
