using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.BusinessObject;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HairSalonSystem.DAOs.Interfaces;

namespace HairSalonSystem.DAOs.Implements
{
    public class BranchDAO : IBranchDAO
    {
        private readonly IMongoCollection<Branch> _branchCollection;

        public BranchDAO(HairSalonContext context)
        {
            _branchCollection = context.Branchs;
        }

        public async Task AddBranchAsync(Branch branch)
        {
            await _branchCollection.InsertOneAsync(branch);
        }

        public async Task UpdateBranchAsync(Branch branch)
        {
            var filter = Builders<Branch>.Filter.Eq(b => b.BranchID, branch.BranchID);

            var update = Builders<Branch>.Update
                .Set(b => b.StaffManagerID, branch.StaffManagerID)
                .Set(b => b.SalonBranches, branch.SalonBranches)
                .Set(b => b.Address, branch.Address)
                .Set(b => b.Phone, branch.Phone)
                .Set(b => b.UpdDate, branch.UpdDate);

            await _branchCollection.UpdateOneAsync(filter, update);
        }

        public async Task DeleteBranchAsync(Guid branchId)
        {
            var filter = Builders<Branch>.Filter.Eq(b => b.BranchID, branchId);
            var update = Builders<Branch>.Update.Set(b => b.DelFlg, false);
            await _branchCollection.UpdateOneAsync(filter, update);
        }

        public async Task<Branch> GetBranchByIdAsync(Guid? branchId)
        {
            return await _branchCollection
                .Find(b => b.BranchID == branchId && b.DelFlg == true)
                .FirstOrDefaultAsync();
        }

        public async Task<List<Branch>> GetAllBranchesAsync()
        {
            return await _branchCollection
                .Find(b => b.DelFlg == true)
                .ToListAsync();
        }

        public async Task<List<Branch>> GetBranchesByManagerIdAsync(Guid managerId)
        {
            return await _branchCollection
                .Find(b => b.StaffManagerID == managerId && b.DelFlg == true)
                .ToListAsync();
        }
    }
}
