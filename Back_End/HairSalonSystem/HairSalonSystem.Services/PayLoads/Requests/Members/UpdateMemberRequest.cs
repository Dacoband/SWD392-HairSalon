﻿using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace HairSalonSystem.Services.PayLoads.Requests.Members
{
    public class UpdateMemberRequest
    {

        [Required(ErrorMessage = "Name is required")]
        [StringLength(100, ErrorMessage = "Name must be less than 100 characters")]
        public string MemberName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress] // Ensure valid email format
        [BsonElement("email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Phone number is required")]
        [StringLength(10, MinimumLength = 10, ErrorMessage = "Phone number must be exactly 10 digits")]
        [RegularExpression(@"^(03|05|07|08|09)\d{8}$", ErrorMessage = "Phone number must be a valid Vietnamese phone number")]
        public string PhoneNumber { get; set; }
    

        [Required(ErrorMessage = "Address is required")]
        public string Address { get; set; }

        public string AvatarImage { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}
