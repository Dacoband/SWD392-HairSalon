using HairSalonSystem.BusinessObject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Repositories.Interface
{
    public interface IStaffManagerRepository
    {
        Task<StaffManager> GetStaffManagerById(Guid id);
        Task<List<StaffManager>> GetAllStaffManagers();
        Task AddStaffManager(StaffManager staffManager);
        Task UpdateStaffManager(StaffManager staffManager);
        Task RemoveStaffManager(Guid id);
        Task<List<StaffManager>> GetBranchesNotBranchIdAsync();
    }
}
