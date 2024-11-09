using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HairSalonSystem.BusinessObject.Entities;

namespace HairSalonSystem.DAOs.Interfaces
{
    public interface IStaffManagerDAO
    {
        Task AddStaffManagerAsync(StaffManager staffManager);
        Task UpdateStaffManagerAsync(StaffManager staffManager);
        Task DeleteStaffManagerAsync(Guid staffManagerId);
        Task<StaffManager> GetStaffManagerByIdAsync(Guid staffManagerId);
        Task<List<StaffManager>> GetAllStaffManagersAsync();
        Task<List<StaffManager>> GetStaffManagersByBranchIdAsync(Guid branchId);
        Task<List<StaffManager>> GetBranchesNotBranchIdAsync();
        Task UpdateStaffManagerBranchIdAsync(Guid staffManagerId, Guid? branchId);
    }
}
