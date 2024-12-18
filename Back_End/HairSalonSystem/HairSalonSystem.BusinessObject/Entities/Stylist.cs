﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.BusinessObject.Entities
{
    public class Stylist
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public Guid StylistId { get; set; }

        [BsonElement("accountId")]
        [BsonRepresentation(BsonType.String)]
        public Guid AccountId { get; set; }

        [BsonElement("branchId")]
        [BsonRepresentation(BsonType.String)]
        public Guid BranchID { get; set; }

        [BsonElement("staffStylistId")]
        [BsonRepresentation(BsonType.String)]
        public Guid StaffStylistId { get; set; }

        [Required]
        [StringLength(100)]
        [BsonElement("stylistName")]
        public required string StylistName { get; set; }

        [BsonElement("averageRating")]
        public double AverageRating { get; set; }
        [BsonElement("baseSalary")]
        public double BaseSalary { get; set; }

        [Required]
        [StringLength(10, MinimumLength = 10)]
        [RegularExpression(@"^[0-9]{10}$", ErrorMessage = "Phone number must be 10 digits.")]
        [BsonElement("phoneNumber")]
        public required string PhoneNumber { get; set; }

        [BsonElement("Address")]
        public string? Address { get; set; }

        [BsonElement("AvatarImage")]
        public string? AvatarImage { get; set; }

        [BsonElement("InsDate")]
        public DateTime InsDate { get; set; }

        [BsonElement("UpdDate")]
        public DateTime UpdDate { get; set; }

        [BsonElement("DelFlg")]
        public bool DelFlg { get; set; }

    }
}
