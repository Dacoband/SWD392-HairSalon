using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace HairSalonSystem.BusinessObject.Entities
{
    public class Branch
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public Guid BranchID { get; set; }

        [BsonRepresentation(BsonType.String)]
        [BsonElement("StaffManagerID")]
        public Guid StaffManagerID { get; set; } 

        [BsonElement("SalonBranches")]
        public string SalonBranches { get; set; }
        [BsonElement("Address")]
        public string Address { get; set; }

        [Required]
        [StringLength(10, MinimumLength = 10)]
        [RegularExpression(@"^[0-9]{10}$", ErrorMessage = "Phone number must be 10 digits.")]
        [BsonElement("Phone")]
        public string Phone { get; set; }
        [BsonElement("InsDate")]
        public DateTime InsDate { get; set; } 
        [BsonElement("UpdDate")]
        public DateTime UpdDate { get; set; } 
        [BsonElement("DelFlg")]
        public bool DelFlg { get; set; }
    }
}
