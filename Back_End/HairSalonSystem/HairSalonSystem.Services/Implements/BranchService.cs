using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Interface;
using HairSalonSystem.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.Implements
{
    public class BranchService : IBranchService
    {
        private readonly IBranchRespository _branchRepository;

        public BranchService(IBranchRespository branchRepository)
        {
            _branchRepository = branchRepository;
        }

        public async Task<Branch> GetBranchById(Guid branchId)
        {
            return await _branchRepository.GetBranchById(branchId);
        }

        public async Task<List<Branch>> GetAllBranches()
        {
            return await _branchRepository.GetAllBranches();
        }

        public async Task AddBranch(Branch branch)
        {
            await _branchRepository.AddBranch(branch);
        }

        public async Task UpdateBranch(Branch branch)
        {
            await _branchRepository.UpdateBranch(branch);
        }

        public async Task RemoveBranch(Guid branchId)
        {
            await _branchRepository.RemoveBranch(branchId);
        }

        public async Task<List<Branch>> GetBranchesByManagerId(Guid managerId)
        {
            return await _branchRepository.GetBranchesByManagerId(managerId);
        }
    }
}
