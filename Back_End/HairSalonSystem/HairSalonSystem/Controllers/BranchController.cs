using Amazon.Runtime;
using HairSalonSystem.API.Constant;
using HairSalonSystem.API.PayLoads.Requests.Branchs;
using HairSalonSystem.API.PayLoads.Responses.Branchs;
using HairSalonSystem.API.Util;
using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HairSalonSystem.API.Controllers
{
    [ApiController]
    public class BranchController : BaseController<BranchController>
    {
        private readonly IBranchService _branchService;
        public BranchController (ILogger<BranchController> logger,IBranchService branchService) : base (logger)
        {
            _branchService = branchService;
        }
        [HttpGet(APIEndPointConstant.Branch.GetBranchById)]
        [ProducesResponseType(typeof(GetBranchResponse), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        public async Task<ActionResult<Branch>> GetBranchById([FromRoute] Guid id)
        {
            var branch = await _branchService.GetBranchById(id);
            if (branch == null)
            {
                return Problem(MessageConstant.BranchMessage.BranchNotFound);
            }
            return Ok(branch);
        }
        [HttpGet(APIEndPointConstant.Branch.GetAllBranches)]
        [ProducesResponseType(typeof(GetBranchResponse), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        public async Task<ActionResult<List<Branch>>> GetAllBranches()
        {
            var branches = await _branchService.GetAllBranches();
            if (branches == null)
            {
                return Problem(MessageConstant.BranchMessage.BranchNotFound);
            }
            return Ok(branches);
        }
        [Authorize]
        [HttpPost(APIEndPointConstant.Branch.AddBranch)]
        [ProducesResponseType(typeof(CreateNewBrachResponse), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        public async Task<ActionResult> AddBranch([FromBody] CreateNewBranchRequest branchDto)
        {
            var accountID = UserUtil.GetAccountId(HttpContext);
            if (accountID == null)
            {
                return Problem(MessageConstant.LoginMessage.NotFoundAccount);
            }
            var roleName = UserUtil.GetRoleName(HttpContext);

           if (roleName != "SA")
            {
                return Problem(MessageConstant.BranchMessage.NotRights);
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

            await _branchService.AddBranch(branch);
            var reponse = new CreateNewBrachResponse()
            {
                BranchID = branch.BranchID,
                StaffManagerID = branch.StaffManagerID,
                SalonBranches = branch.SalonBranches,
                Address = branch.Address,
                Phone = branch.Phone,
            };

            return CreatedAtAction(nameof(AddBranch),reponse);
        }
        [HttpPatch(APIEndPointConstant.Branch.UpdateBranch)]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        public async Task<ActionResult> UpdateBranch([FromRoute] Guid id, [FromBody] UpdateBranchRequest branchDto)
        {
            
            if (id == Guid.Empty)
            {
                throw new BadHttpRequestException(MessageConstant.BranchMessage.BranchNotFound);
            }
            var existingBranch = await _branchService.GetBranchById(id);
            if (existingBranch == null)
            {
                throw new BadHttpRequestException(MessageConstant.BranchMessage.BranchNotExist);
            }

            var branch = new Branch
            {
                StaffManagerID = branchDto.StaffManagerID != Guid.Empty ? branchDto.StaffManagerID : existingBranch.StaffManagerID,
                SalonBranches = string.IsNullOrEmpty(branchDto.SalonBranches) ? existingBranch.SalonBranches : branchDto.SalonBranches,
                Address = string.IsNullOrEmpty(branchDto.Address) ? existingBranch.Address : branchDto.Address,
                Phone = string.IsNullOrEmpty(branchDto.Phone) ? existingBranch.Phone : branchDto.Phone,
                UpdDate = TimeUtils.GetCurrentSEATime(),
            };

            await _branchService.UpdateBranch(branch);
            return NoContent();
        }
        [HttpDelete(APIEndPointConstant.Branch.DeleteBranch)]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        public async Task<IActionResult> RemoveBranch([FromRoute] Guid branchId)
        {
            await _branchService.RemoveBranch(branchId);
            return Ok();
        }

    }
}
