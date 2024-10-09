using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.BusinessObject.Entities
{
    public class AppointmentService
    {
        [BsonElement]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public Guid ServiceId { get; set; }
        [BsonElement]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public Guid AppointmentId { get; set; }
        [BsonElement]
        [BsonRepresentation(BsonType.Decimal128)]
        public float UnitPrice { get; set; }

        
    }
}
