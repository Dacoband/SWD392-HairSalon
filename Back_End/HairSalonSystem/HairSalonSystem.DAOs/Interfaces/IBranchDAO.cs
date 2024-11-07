using HairSalonSystem.BusinessObject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.DAOs.Interfaces
{
    public interface IBranchDAO
    {
        Task AddBranchAsync(Branch branch);
        Task UpdateBranchAsync(Branch branch);
        Task DeleteBranchAsync(Guid branchId);
        Task<Branch> GetBranchByIdAsync(Guid? branchId);
        Task<List<Branch>> GetAllBranchesAsync();
        Task<List<Branch>> GetBranchesByManagerIdAsync(Guid managerId);
        Task<bool> CheckStaffManagerExistsAsync(Guid staffManagerId);
    }
}
