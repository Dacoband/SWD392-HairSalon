using MongoDB.Bson.Serialization.Attributes;

namespace HairSalonSystem.Services.PayLoads.Responses.Branchs
{
    public class CreateNewBrachResponse
    {
        public Guid BranchID { get; set; }
        public Guid StaffManagerID { get; set; }
        public string SalonBranches { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
       
       
    }
}
