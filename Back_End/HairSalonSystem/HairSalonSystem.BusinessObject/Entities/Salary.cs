using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.BusinessObject.Entities
{
    public class Salary
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public Guid SalaryId { get; set; }
        [BsonElement]
        [BsonRepresentation(BsonType.String)]
        public Guid StylistId { get; set; }
        [BsonElement]
        [BsonRepresentation(BsonType.Double)]
        public double BaseSalary { get; set; }
        [BsonElement]
        [BsonRepresentation(BsonType.Double)]
        public double CommissionPercentage { get; set; }
        [BsonElement]
        [BsonRepresentation(BsonType.Double)]
        public double TotalSalary { get; set;}
        [BsonElement]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime PaymentDate { get; set; }
        [BsonElement]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime InsDate { get; set;}
        [BsonElement]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime UpdDate { get; set; }
        [BsonElement]
        [BsonRepresentation(BsonType.Boolean)]
        public bool DelFlg {  get; set; }
    }
}
