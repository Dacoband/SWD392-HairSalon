using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HairSalonSystem.BusinessObject.Entities
{
    public class Branch
    {
        [BsonId]
        public Guid BranchID { get; set; }

        [BsonElement("StaffManagerID")]
        public Guid StaffManagerID { get; set; } 

        [BsonElement("SalonBranches")]
        public string SalonBranches { get; set; }
        [BsonElement("Address")]
        public string Address { get; set; } 
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
