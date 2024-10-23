using MongoDB.Bson.Serialization.Attributes;

namespace HairSalonSystem.Services.PayLoads.Requests.Branchs
{
    public class UpdateBranchRequest
    {
        public Guid StaffManagerID { get; set; }
        public string SalonBranches { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
    }
}
