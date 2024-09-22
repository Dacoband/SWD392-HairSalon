using System.ComponentModel.DataAnnotations;

namespace HairSalonSystem.API.PayLoads.Requests
{
    public class LoginRequest
    {
        [Required(ErrorMessage = "Email is required")]
        [MaxLength(100, ErrorMessage = "Email's max length is 100 characters")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Password is required")]
        [MaxLength(64, ErrorMessage = "Password's max length is 64 characters")]
        public string Password { get; set; }
    }
}
