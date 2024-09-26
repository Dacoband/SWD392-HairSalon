using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Interface;
using HairSalonSystem.Services.Constant;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.PayLoads.Responses.Branchs;
using HairSalonSystem.Services.Util;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HairSalonSystem.Services.PayLoads.Requests.Branchs;

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

        public async Task<ActionResult> CreateNewBranch(CreateNewBranchRequest branchDto, HttpContext httpContext)
        {
            var accountID = UserUtil.GetAccountId(httpContext);
            if (accountID == null)
            {
                return new ObjectResult(MessageConstant.LoginMessage.NotFoundAccount)
                {
                    StatusCode = StatusCodes.Status400BadRequest
                };
            }

            var roleName = UserUtil.GetRoleName(httpContext);
            if (roleName != "SA")
            {
                return new ObjectResult(MessageConstant.BranchMessage.NotRights)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }

            var branch = new Branch
            {
                BranchID = Guid.NewGuid(),
                StaffManagerID = branchDto.StaffManagerID,
                SalonBranches = branchDto.SalonBranches,
                Address = branchDto.Address,
                Phone = branchDto.Phone,
                InsDate = TimeUtils.GetCurrentSEATime(),
                UpdDate = TimeUtils.GetCurrentSEATime(),
                DelFlg = true
            };

            await _branchRepository.AddBranch(branch);

            var response =  new CreateNewBrachResponse
            {
                BranchID = branch.BranchID,
                StaffManagerID = branch.StaffManagerID,
                SalonBranches = branch.SalonBranches,
                Address = branch.Address,
                Phone = branch.Phone,
            };
            return new CreatedAtActionResult(nameof(CreateNewBranch), "Branch", null, response);

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
