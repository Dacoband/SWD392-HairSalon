using HairSalonSystem.BusinessObject;
using HairSalonSystem.BusinessObject.Entities;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.DAOs.Implements
{
    public class BranchDao
    {
        private readonly IMongoCollection<Branch> _branchCollection;

        public BranchDao(HairSalonContext context)
        {
            _branchCollection = context.Branchs ;
        }

        public async Task AddBranchAsync(Branch branch)
        {
            await _branchCollection.InsertOneAsync(branch);
        }

        public async Task UpdateBranchAsync(Branch branch)
        {
            var filter = Builders<Branch>.Filter.Eq(b => b.BranchID, branch.BranchID);
            var update = Builders<Branch>.Update
                .Set(b => b.SalonBranches, branch.SalonBranches)
                .Set(b => b.Address, branch.Address)
                .Set(b => b.Phone, branch.Phone)
                .Set(b => b.UpdDate, DateTime.Now);
            await _branchCollection.UpdateOneAsync(filter, update);
        }

        public async Task DeleteBranchAsync(Guid branchId)
        {
            var filter = Builders<Branch>.Filter.Eq(b => b.BranchID, branchId);
            var update = Builders<Branch>.Update.Set(b => b.DelFlg, true);
            await _branchCollection.UpdateOneAsync(filter, update);
        }

        public async Task<Branch> GetBranchByIdAsync(Guid branchId)
        {
            return await _branchCollection
                .Find(b => b.BranchID == branchId && b.DelFlg == false)
                .FirstOrDefaultAsync();
        }

        public async Task<List<Branch>> GetAllBranchesAsync()
        {
            return await _branchCollection
                .Find(b => b.DelFlg == false)
                .ToListAsync();
        }

        public async Task<List<Branch>> GetBranchesByManagerIdAsync(Guid managerId)
        {
            return await _branchCollection
                .Find(b => b.StaffManagerID == managerId && b.DelFlg == false)
                .ToListAsync();
        }

        public async Task<bool> BranchExistsAsync(Guid branchId)
        {
            var branch = await _branchCollection
                .Find(b => b.BranchID == branchId && b.DelFlg == false)
                .FirstOrDefaultAsync();
            return branch != null;
        }
    }
}
