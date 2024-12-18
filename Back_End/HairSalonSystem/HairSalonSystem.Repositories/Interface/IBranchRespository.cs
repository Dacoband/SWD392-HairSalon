﻿using HairSalonSystem.BusinessObject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Repositories.Interface
{
    public interface IBranchRespository
    {
        Task<Branch> GetBranchById(Guid? branchId);
        Task<List<Branch>> GetAllBranches();
        Task AddBranch(Branch branch);
        Task UpdateBranch(Branch branch);
        Task RemoveBranch(Guid branchId);
        Task<List<Branch>> GetBranchesByManagerId(Guid managerId);
        Task<bool> CheckStaffManagerExists(Guid staffManagerId);
    }
}
