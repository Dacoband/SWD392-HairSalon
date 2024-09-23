using System.ComponentModel.DataAnnotations;

namespace HairSalonSystem.API.PayLoads.Requests.Members
{
    public class CreateNewMemberRequest
    {
        [Required(ErrorMessage = "Member name is required")]
        [StringLength(100, ErrorMessage = "Member name must be less than 100 characters")]
        public string MemberName { get; set; }

        [Required(ErrorMessage = "Date of birth is required")]
        [DataType(DataType.Date, ErrorMessage = "Invalid date format")]
        public DateTime DateOfBirth { get; set; }

        [Required(ErrorMessage = "Phone number is required")]
        [StringLength(10, MinimumLength = 10, ErrorMessage = "Phone number must be exactly 10 digits")]
        [RegularExpression(@"^[0-9]{10}$", ErrorMessage = "Phone number must be 10 digits")]
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "Address is required")]
        public string Address { get; set; }

        public string AvatarImage { get; set; }
    }
}
