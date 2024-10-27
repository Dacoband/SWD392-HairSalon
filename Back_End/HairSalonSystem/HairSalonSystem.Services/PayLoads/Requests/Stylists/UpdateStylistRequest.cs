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
        [Required]
        [StringLength(100, ErrorMessage = "Stylist name must be at most 100 characters long.")]
        public string StylistName { get; set; }
        public Guid StaffStylistId { get; set; }
        [Required]
        [RegularExpression(@"^[0-9]{10}$", ErrorMessage = "Phone number must be exactly 10 digits.")]
        public string PhoneNumber { get; set; }

        public string Address { get; set; }
        public string AvatarImage { get; set; }
        public DateTime UpdDate { get; set; } = DateTime.UtcNow;
    }
}
