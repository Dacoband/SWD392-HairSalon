using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace HairSalonSystem.Services.PayLoads.Requests.Accounts
{
    public class CreateNewAccountRequest
    {
        [Required(ErrorMessage = "Email is missing")]
        [EmailAddress] // Ensure valid email format
        public string Email { get; set; }
        
        [Required] // Password is required
        [StringLength(180, MinimumLength = 8)] // Password must be between 8 and 180 characters
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$",
             ErrorMessage = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.")]
        public string Password { get; set; }
        public CreateNewAccountRequest()
        {
        }
    }
}
