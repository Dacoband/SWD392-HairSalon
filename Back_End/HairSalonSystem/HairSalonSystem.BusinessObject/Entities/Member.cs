using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.BusinessObject.Entities
{
    public class Member
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public Guid MemberId { get; set; }

        [BsonElement("accountId")]
        [BsonRepresentation(BsonType.String)] // AccountId stored as string in MongoDB
        public Guid AccountId { get; set; }

        [Required] // MemberName is required
        [StringLength(100)] 
        [BsonElement("memberName")]
        public string MemberName { get; set; }

        [Required] // DateOfBirth is required
        [BsonElement("dateOfBirth")]
        public DateTime DateOfBirth { get; set; }

        [Required] // PhoneNumber is required
        [StringLength(10, MinimumLength = 10)] 
        [RegularExpression(@"^[0-9]{10}$", ErrorMessage = "Phone number must be 10 digits.")]
        [BsonElement("phoneNumber")]
        public string PhoneNumber { get; set; }

        [Required] // Address is required
        [BsonElement("address")]
        public string Address { get; set; }

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
