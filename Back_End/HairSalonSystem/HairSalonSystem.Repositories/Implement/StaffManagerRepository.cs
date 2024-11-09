using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.DAOs.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HairSalonSystem.Repositories.Interface;
using HairSalonSystem.DAOs;

namespace HairSalonSystem.Repositories.Implement
{
    public class StaffManagerRepository : IStaffManagerRepository
    {
        private readonly IStaffManagerDAO _staffManagerDAO;

        public StaffManagerRepository(IStaffManagerDAO staffManagerDAO)
        {
            _staffManagerDAO = staffManagerDAO;
        }

        public async Task<StaffManager> GetStaffManagerById(Guid id)
        {
            return await _staffManagerDAO.GetStaffManagerByIdAsync(id);
        }

        public async Task<List<StaffManager>> GetAllStaffManagers()
        {
             return await _staffManagerDAO.GetAllStaffManagersAsync();
        }

        public async Task AddStaffManager(StaffManager staffManager)
        {
            await _staffManagerDAO.AddStaffManagerAsync(staffManager);
        }

        public async Task UpdateStaffManager(StaffManager staffManager)
        {
            await _staffManagerDAO.UpdateStaffManagerAsync(staffManager);
        }

        public async Task RemoveStaffManager(Guid id)
        {
            await _staffManagerDAO.DeleteStaffManagerAsync(id);
        }

        public async Task<List<StaffManager>> GetBranchesNotBranchIdAsync()
        {
            return  await _staffManagerDAO.GetBranchesNotBranchIdAsync();
        }
        public async Task UpdateStaffManagerBranchIdAsync(Guid staffManagerId, Guid? branchId)
        {
            await _staffManagerDAO.UpdateStaffManagerBranchIdAsync(staffManagerId, branchId);
        }
    }
}