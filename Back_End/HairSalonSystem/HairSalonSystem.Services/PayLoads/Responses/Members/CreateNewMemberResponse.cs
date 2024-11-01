namespace HairSalonSystem.Services.PayLoads.Responses.Members
{
    public class CreateNewMemberResponse
    {
        public string Email { get; set; }

        public string MemberName { get; set; }
        public string RoleName { get; set; }

        public DateTime DateOfBirth { get; set; }  

        public string PhoneNumber { get; set; }

        public string Address { get; set; }

        public string AvatarImage { get; set; }  
    }
}
