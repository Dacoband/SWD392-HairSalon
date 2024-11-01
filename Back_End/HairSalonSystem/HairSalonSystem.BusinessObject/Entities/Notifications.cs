using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Serializers;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.BusinessObject.Entities
{
    public class Notifications
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public Guid NotificationId { get; set; }
        [BsonElement("memberId")]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public Guid MemberId { get; set; }
        [BsonElement("message")]
        public string? Message { get; set; }

        [BsonElement("insDate")]
        public DateTime InsDate { get; set; }

        [BsonElement("updDate")]
        public DateTime UpdDate { get; set; }

        [BsonElement("delFlg")]
        public bool DelFlg { get; set; }
    }
}
