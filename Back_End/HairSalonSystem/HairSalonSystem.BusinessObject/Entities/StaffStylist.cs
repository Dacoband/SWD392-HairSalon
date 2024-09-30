using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.BusinessObject.Entities
{
    public class StaffStylist
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public Guid StaffStylistId { get; set; }
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public Guid BranchID { get; set; }
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public Guid AccountId { get; set; }
        [Required]
        [StringLength(100)]
        [BsonElement("StaffStylistName")]
        public required string StaffStylistName { get; set; }
        [Required]
        [BsonElement("DateOfBirth")]
        public DateTime DateOfBirth { get; set; }
        [Required]
        [StringLength(10, MinimumLength = 10)]
        [RegularExpression(@"^[0-9]{10}$", ErrorMessage = "Phone number must be 10 digits.")]
        [BsonElement("phoneNumber")]
        public required string PhoneNumber { get; set; }
        [Required]
        [BsonElement("Address")]
        public required string Address { get; set; }
        [Required]
        [BsonElement("avatarImage")]
        public string AvatarImage { get; set; }
        [BsonElement("insDate")]
        public DateTime? InsDate { get; set; }

        [BsonElement("updDate")]
        public DateTime? UpdDate { get; set; }

        [BsonElement("delFlg")]
        public bool? DelFlg { get; set; }



    }
}
