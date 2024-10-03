using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Responses.StaffStylists
{
    public class UpdateStaffStylistResponse
    {
        public Guid StaffStylistId { get; set; }
        public string Message { get; set; }
    }
}
