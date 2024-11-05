using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.BusinessObject.Entities
{
    public class Feedback
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public Guid FeedbackId { get; set; }
        [BsonRepresentation(BsonType.String)]
        [BsonElement("MemberId")]
        public Guid MemberId { get; set; }
        [BsonRepresentation(BsonType.String)]
        [BsonElement("StylistId")]
        public Guid StylistId { get; set; }
        [BsonElement("Rating")]
        public int Rating { get; set; }
        [BsonElement("Comment")]
        public string? Comment { get; set; }
        [BsonElement("InsDate")]
        public DateTime InsDate { get; set; }
        [BsonElement("UpdDate")]
        public DateTime UpdDate { get; set; }
        [BsonElement("DelFlg")]
        public bool DelFlg { get; set; }
    }
}
