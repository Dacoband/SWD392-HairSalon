using HairSalonSystem.BusinessObject;
using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.DAOs.Interfaces;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HairSalonSystem.DAOs.Interfaces;

namespace HairSalonSystem.DAOs.Implements
{
    public class StaffManagerDAO : BaseDAO<StaffManager>, IStaffManagerDao
    {
        public StaffManagerDAO(HairSalonContext context)
            : base(context.StaffManagers) // Truyền collection StaffManagers vào BaseDAO
        {
        }
        public async Task AddStaffManagerAsync(StaffManager staffManager)
        {
            await AddAsync(staffManager);
        }

        public async Task UpdateStaffManagerAsync(StaffManager staffManager)
        {
            var filter = Builders<StaffManager>.Filter.Eq(sm => sm.StaffManagerID, staffManager.StaffManagerID);
            var update = Builders<StaffManager>.Update
                .Set(sm => sm.BranchID, staffManager.BranchID)
                .Set(sm => sm.StaffManagerName, staffManager.StaffManagerName)
                .Set(sm => sm.DateOfBirth, staffManager.DateOfBirth)
                .Set(sm => sm.PhoneNumber, staffManager.PhoneNumber)
                .Set(sm => sm.Address, staffManager.Address)
                .Set(sm => sm.AvatarImage, staffManager.AvatarImage)
                .Set(sm => sm.UpdDate, staffManager.UpdDate);
               ;
            await UpdateAsync(filter, update);
        }

        public async Task DeleteStaffManagerAsync(Guid staffManagerId)
        {
            var filter = Builders<StaffManager>.Filter.Eq(sm => sm.StaffManagerID, staffManagerId);
            await DeleteAsync(filter);
        }

        public async Task<StaffManager> GetStaffManagerByIdAsync(Guid staffManagerId)
        {
            var filter = Builders<StaffManager>.Filter.Eq(sm => sm.StaffManagerID, staffManagerId)
                        & Builders<StaffManager>.Filter.Eq(sm => sm.DelFlg, true);
            return await GetByIdAsync(filter);
        }

        public async Task<List<StaffManager>> GetAllStaffManagersAsync()
        {
            var filter = Builders<StaffManager>.Filter.Eq(sm => sm.DelFlg, true);
            return await GetAllAsync(filter);
        }

        public async Task<List<StaffManager>> GetStaffManagersByBranchIdAsync(Guid branchId)
        {
            var filter = Builders<StaffManager>.Filter.Eq(sm => sm.BranchID, branchId)
                        & Builders<StaffManager>.Filter.Eq(sm => sm.DelFlg, true);
            return await GetAllAsync(filter);
        }
    }

}
