﻿namespace HairSalonSystem.Services.PayLoads.Responses.Branchs
{
    public class GetBranchResponse
    {
        public Guid BranchID { get; set; }
        public Guid StaffManagerID { get; set; }
        public string SalonBranches { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public DateTime InsDate { get; set; }
        public DateTime UpdDate { get; set; }
    }
}