using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Responses.StaffManagers
{
    public class CreateNewStaffManagerResponse
    {
        public string Email { get; set; } 
        public Guid? BranchID { get; set; }
        public string StaffManagerName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }

        public string AvatarImage { get; set; }
    }
}
