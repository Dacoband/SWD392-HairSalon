using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.BusinessObject.Entities
{
    public class OffSchedule
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public Guid OffScheduleId { get; set; }

        [BsonElement]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime OffDate { get; set; }
        [BsonElement]
        [BsonRepresentation(BsonType.Int32)]
        public int OffSlot { get; set; }
        [BsonElement]
        [BsonRepresentation(BsonType.Boolean)]
        public bool DelFlg { get; set; }
    }
}
