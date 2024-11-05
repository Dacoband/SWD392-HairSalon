using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.BusinessObject.Entities
{
    public class StaffManager
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public Guid StaffManagerID { get; set; }

        [BsonElement("branchID")]
        [BsonRepresentation(BsonType.String)] // BranchID stored as string in MongoDB
        public Guid BranchID { get; set; }

        [Required]
        [BsonElement("accountID")]
        [BsonRepresentation(BsonType.String)]
        public Guid AccountID { get; set; }

        [Required]
        [StringLength(100)]
        [BsonElement("staffManagerName")]
        public required string StaffManagerName { get; set; }

        [Required]
        [BsonElement("dateOfBirth")]
        public DateTime DateOfBirth { get; set; }

        [Required]
        [StringLength(10, MinimumLength = 10)]
        [RegularExpression(@"^[0-9]{10}$", ErrorMessage = "Phone number must be 10 digits.")]
        [BsonElement("phoneNumber")]
        public required string PhoneNumber { get; set; }

        [Required]
        [BsonElement("address")]
        public string? Address { get; set; }

        [BsonElement("avatarImage")]
        public string AvatarImage { get; set; } = string.Empty; // Max size constraint not set here

        [BsonElement("insDate")]
        public DateTime? InsDate { get; set; }

        [BsonElement("updDate")]
        public DateTime? UpdDate { get; set; }

        [BsonElement("delFlg")]
        public bool? DelFlg { get; set; }
    }
}
