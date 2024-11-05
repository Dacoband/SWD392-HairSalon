using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace HairSalonSystem.BusinessObject.Entities
{
    public class Payment
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public Guid Id { get; set; }

        [BsonElement("appointmentId")]
        [BsonRepresentation(BsonType.String)]
        public Guid AppointmentId { get; set; }

        [BsonElement("paymentLinkId")]
        public string PaymentLinkId { get; set; }

        [BsonElement("status")]
        public string Status { get; set; }

        [BsonElement("amount")]
        public float Amount { get; set; }

        [BsonElement("timestamp")]
        public DateTime Timestamp { get; set; }
    }
}
