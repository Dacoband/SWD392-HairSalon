 using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.BusinessObject.Entities
{
    public class Account
    {
        [BsonId] 
        [BsonRepresentation(BsonType.String)]
        public Guid AccountId { get; set; }

        [StringLength(20)] 
        [BsonElement("roleName")]
        public string RoleName { get; set; }

        [Required] 
        [EmailAddress] 
        [BsonElement("email")]
        public required string Email { get; set; }

        [Required] 
        [StringLength(180, MinimumLength = 8)] // Password must be between 8 and 180 characters
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$",
             ErrorMessage = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.")]
        [BsonElement("password")]
        public required string Password { get; set; }

        [BsonElement("insDate")]
        public DateTime? InsDate { get; set; }

        [BsonElement("updDate")]
        public DateTime? UpdDate { get; set; }

        [BsonElement("delFlg")]
        public bool? DelFlg { get; set; }
    }
}
