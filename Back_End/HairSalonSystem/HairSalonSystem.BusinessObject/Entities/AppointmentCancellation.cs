using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.BusinessObject.Entities
{
    public class AppointmentCancellation
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public Guid CancellationId { get; set; }

        [BsonElement]
        [BsonRepresentation(BsonType.String)]
        public Guid AppointmentId { get; set; }

        [BsonElement]
        [BsonRepresentation(BsonType.String)]
        public string Reason { get; set; }

        [BsonElement]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime InsDate { get; set; }

        [BsonElement]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime UpdDate { get; set; }

        [BsonElement]
        [BsonRepresentation(BsonType.Boolean)]
        public bool DelFlg { get; set; }
    }
}
