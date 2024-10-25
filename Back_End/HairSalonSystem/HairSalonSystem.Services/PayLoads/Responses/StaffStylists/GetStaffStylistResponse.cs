using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Responses.StaffStylists
{
    public class GetStaffStylistResponse
    {
        public Guid StaffStylistId { get; set; }
        public string StaffStylistName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string AvatarImage { get; set; }
        public string Message { get; set; }
    }
}
