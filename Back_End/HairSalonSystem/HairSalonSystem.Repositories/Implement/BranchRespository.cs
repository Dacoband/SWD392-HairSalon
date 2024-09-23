using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.DAOs.Interfaces;
using HairSalonSystem.Repositories.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Repositories.Implement
{
    public class BranchRespository : IBranchRespository
    {
        private readonly IBranchDao _branchDao;

        public BranchRespository(IBranchDao branchDao)
        {
            _branchDao = branchDao;
        }

        public async Task<Branch> GetBranchById(Guid branchId)
        {
            return await _branchDao.GetBranchByIdAsync(branchId);
        }

        public async Task<List<Branch>> GetAllBranches()
        {
            return await _branchDao.GetAllBranchesAsync();
        }

        public async Task AddBranch(Branch branch)
        {
            await _branchDao.AddBranchAsync(branch);
        }

        public async Task UpdateBranch(Branch branch)
        {
            await _branchDao.UpdateBranchAsync(branch);
        }

        public async Task RemoveBranch(Guid branchId)
        {
            await _branchDao.DeleteBranchAsync(branchId);
        }

        public async Task<List<Branch>> GetBranchesByManagerId(Guid managerId)
        {
            return await _branchDao.GetBranchesByManagerIdAsync(managerId);
        }
    }
}
