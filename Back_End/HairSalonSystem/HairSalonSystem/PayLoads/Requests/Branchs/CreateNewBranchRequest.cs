using MongoDB.Bson.Serialization.Attributes;

namespace HairSalonSystem.API.PayLoads.Requests.Branchs
{
    public class CreateNewBranchRequest
    {
        public Guid StaffManagerID { get; set; }

       
        public string SalonBranches { get; set; }
        
        public string Address { get; set; }
    
        public string Phone { get; set; }
    }
}
