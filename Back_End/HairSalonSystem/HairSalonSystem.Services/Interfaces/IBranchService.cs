using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Services.PayLoads.Requests.Branchs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.Interfaces
{
    public interface IBranchService
    {
        Task<Branch> GetBranchById(Guid branchId);
        Task<List<Branch>> GetAllBranches();
        public Task<ActionResult> CreateNewBranch(CreateNewBranchRequest branchDto, HttpContext httpContext);
        Task UpdateBranch(Branch branch);
        Task RemoveBranch(Guid branchId);
        Task<List<Branch>> GetBranchesByManagerId(Guid managerId);
    }
}
