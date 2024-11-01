using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Requests.StaffStylists
{
    public class CreateStaffStylistRequest
    {
        [Required(ErrorMessage = "BranchId is required.")]
        public Guid BranchId { get; set; }

        [Required(ErrorMessage = "Email is missing")]
        [EmailAddress] // Ensure valid email format
        public string Email { get; set; }

        [Required] // Password is required
        [StringLength(180, MinimumLength = 8)]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$",
             ErrorMessage = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.")]
        public string Password { get; set; }

        [Required(ErrorMessage = "StaffStylistName is required.")]
        [StringLength(100, ErrorMessage = "StaffStylistName cannot be longer than 100 characters.")]
        public string StaffStylistName { get; set; }

        [Required(ErrorMessage = "DateOfBirth is required.")]
        public DateTime DateOfBirth { get; set; }

        [Required(ErrorMessage = "PhoneNumber is required.")]
        [RegularExpression(@"^[0-9]{10}$", ErrorMessage = "Phone number must be 10 digits.")]
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "Address is required.")]
        public string Address { get; set; }

        [Required(ErrorMessage = "AvatarImage is required.")]
        public IFormFile AvatarImage { get; set; }
    }
}
