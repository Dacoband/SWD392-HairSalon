using HairSalonSystem.Services.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Requests.OffSchedule
{
    public class CreateOffScheduleRequest
    {
        public Guid StylistId { get; set; } 
        public DateTime OffDate {  get; set; }
        public SlotEnum OffSlot { get; set; }    
    }
}
