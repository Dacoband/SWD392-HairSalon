using MongoDB.Bson.Serialization.Attributes;
using System;
using MongoDB.Bson;

namespace HairSalonSystem.BusinessObject.Entities
{
    public class SalaryStylist
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public Guid SalaryStylistID { get; set; }

        [BsonRepresentation(BsonType.String)]
        [BsonElement("StylistID")]
        public Guid StylistID { get; set; }

        [BsonElement("BaseSalary")]
        public float BaseSalary { get; set; }

        [BsonElement("CommissionPercentage")]
        public double CommissionPercentage { get; set; }

        [BsonElement("TotalEarnings")]
        public float TotalEarnings { get; set; }

        [BsonElement("PaymentDate")]
        public DateTime PaymentDate { get; set; }

        [BsonElement("InsDate")]
        public DateTime InsDate { get; set; }

        [BsonElement("UpdDate")]
        public DateTime UpdDate { get; set; }

        [BsonElement("DelFlg")]
        public bool DelFlg { get; set; }
    }
}
