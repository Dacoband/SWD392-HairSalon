using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Responses.StaffManagers
{
     public class UpdateStaffManagerResponse
    {
        public Guid BranchID { get; set; }
        public string StaffManagerName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string AvatarImage { get; set; }
        public DateTime UpdDate { get; set; }
    }
}
