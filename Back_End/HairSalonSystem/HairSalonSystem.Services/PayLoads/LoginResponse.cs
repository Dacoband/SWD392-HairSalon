namespace HairSalonSystem.Services.PayLoads
{
    public class LoginResponse
    {
        public string Token { get; set; }
        public Guid actorId { get; set; }
        public string Email { get; set; }
        public string RoleName { get; set; }
    }
}
