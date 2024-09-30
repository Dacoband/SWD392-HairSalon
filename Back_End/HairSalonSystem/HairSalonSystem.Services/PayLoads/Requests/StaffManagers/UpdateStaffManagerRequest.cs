using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Requests.StaffManagers
{
    public class UpdateStaffManagerRequest
    {
        [Required]
        [StringLength(100)]
        [BsonElement("staffManagerName")]
        public string StaffManagerName { get; set; }

        [Required]
        [BsonElement("dateOfBirth")]
        public DateTime DateOfBirth { get; set; }

        [Required]
        [StringLength(10, MinimumLength = 10)]
        [RegularExpression(@"^[0-9]{10}$", ErrorMessage = "Phone number must be 10 digits.")]
        [BsonElement("phoneNumber")]
        public string PhoneNumber { get; set; }

        [Required]
        [BsonElement("address")]
        public string Address { get; set; }

        [BsonElement("avatarImage")]
        public string AvatarImage { get; set; } = string.Empty;

        [BsonElement("updDate")]
        public DateTime? UpdDate { get; set; }
    }
}
