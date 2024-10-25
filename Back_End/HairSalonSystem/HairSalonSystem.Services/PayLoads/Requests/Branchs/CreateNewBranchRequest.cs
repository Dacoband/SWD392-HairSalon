using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace HairSalonSystem.Services.PayLoads.Requests.Branchs
{
    public class CreateNewBranchRequest
    {
        public Guid StaffManagerID { get; set; }

        public string SalonBranches { get; set; }
        [Required]
        [StringLength(100)]
        public string Address { get; set; }
        [Required] // PhoneNumber is required
        [StringLength(10, MinimumLength = 10)]
        [RegularExpression(@"^[0-9]{10}$", ErrorMessage = "Phone number must be 10 digits.")]
        public string Phone { get; set; }
    }
}
