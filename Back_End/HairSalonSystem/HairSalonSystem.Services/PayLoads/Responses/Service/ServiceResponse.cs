using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Responses.Service
{
    public class ServiceResponse
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public Guid ServiceID { get; set; }

        [BsonElement("ServiceName")]
        [StringLength(100)]
        public string ServiceName { get; set; }

        [BsonElement("Type")]
        public int Type { get;set; }

        [BsonElement("Price")]
        public float Price { get; set; }

        [BsonElement("Description")]
        public string? Description { get; set; }

        [BsonElement("Duration")]
        public int Duration { get; set; } // minutes

        [BsonElement("AvatarImage")]
        public string? AvatarImage { get; set; }

        [BsonElement("InsDate")]
        public DateTime InsDate { get; set; }

        [BsonElement("UpdDate")]
        public DateTime? UpdDate { get; set; }

        [BsonElement("DelFlg")]
        public bool DelFlg {  get; set; }
    }
}
