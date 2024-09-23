using System.ComponentModel.DataAnnotations;

namespace HairSalonSystem.API.PayLoads.Responses.Accounts
{
    public class CreateNewAccountResponse
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
