using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.ComponentModel.DataAnnotations;

namespace HairSalonSystem.BusinessObject.Entities
{
    public class StaffStylist
    {
        [BsonId]  // Chỉ giữ BsonId cho trường này
        [BsonRepresentation(BsonType.String)]
        public Guid StaffStylistId { get; set; }

        [BsonElement("branchId")]  // Sử dụng BsonElement cho các trường khác
        [BsonRepresentation(BsonType.String)]
        public Guid BranchID { get; set; }

        [BsonElement("accountId")]
        [BsonRepresentation(BsonType.String)]
        public Guid AccountId { get; set; }

        [Required]
        [StringLength(100)]
        [BsonElement("staffStylistName")]
        public required string StaffStylistName { get; set; }

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
