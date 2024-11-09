using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Requests.Stylists
{
    public class UpdateStylistRequest
    {
        public string? StylistName { get; set; }
       // public string? Email { get; set; }
        public Guid? StaffStylistId { get; set; }
        public Guid? BranchID { get; set; }
        [RegularExpression(@"^[0-9]{10}$", ErrorMessage = "Phone number must be exactly 10 digits.")]
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public IFormFile? AvatarImage { get; set; }
    }
}
