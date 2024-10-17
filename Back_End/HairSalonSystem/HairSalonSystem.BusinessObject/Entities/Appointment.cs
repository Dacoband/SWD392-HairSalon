using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.BusinessObject.Entities
{
    public class Appointment 
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public Guid AppointmentId { get; set; }
        [BsonElement]
        [BsonRepresentation(BsonType.String)]
        public Guid CustomerId { get; set; }
        [BsonElement]
        [BsonRepresentation(BsonType.String)]
        public Guid StylistId { get; set; }
       
        [BsonElement]
        [BsonRepresentation(BsonType.Int32)]
        public int Status { get; set; }
        // 1: created -> 2: cancel by cus -> 3: cancel by salon -> 4 : completed 

        [BsonElement]
        [BsonRepresentation(BsonType.Decimal128)]
        public float TotalPrice { get; set; }

        [BsonElement]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime InsDate { get; set; }
        [BsonElement]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime UpDate { get; set; }
        [BsonElement]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime StartTime { get; set; }
        [BsonElement]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime EndTime { get; set; }

        public virtual ICollection<AppointmentService> AppointmentService { get; set; } = new List<AppointmentService>();

    }
}
