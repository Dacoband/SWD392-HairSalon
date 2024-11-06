using Amazon.Runtime;
using HairSalonSystem.Services.Constant;
using HairSalonSystem.Services.PayLoads.Requests.Branchs;
using HairSalonSystem.Services.PayLoads.Responses.Branchs;
using HairSalonSystem.Services.Util;
using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HairSalonSystem.Services.Controllers
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
            return await _branchService.GetBranchById(id);
        }
        [HttpGet(APIEndPointConstant.Branch.GetAllBranches)]
        [ProducesResponseType(typeof(List<Branch>), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        public async Task<ActionResult<List<Branch>>> GetAllBranches()
        {
            return await _branchService.GetAllBranches();
        }
        [HttpPost(APIEndPointConstant.Branch.AddBranch)]
        [ProducesResponseType(typeof(CreateNewBrachResponse), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        public async Task<ActionResult> AddBranch([FromBody] CreateNewBranchRequest branchDto)
        {
            return await _branchService.CreateNewBranch(branchDto, HttpContext);

        }

        //[HttpPost(APIEndPointConstant.Branch.AddBranch)]
        //[ProducesResponseType(typeof(CreateNewBrachResponse), StatusCodes.Status200OK)]
        //[ProducesErrorResponseType(typeof(ProblemDetails))]
        //public async Task<ActionResult> AddBranch([FromBody] CreateNewBranchRequest branchDto)
        //{
        //    var accountID = UserUtil.GetAccountId(HttpContext);
        //    if (accountID == null)
        //    {
        //        return Problem(MessageConstant.LoginMessage.NotFoundAccount);
        //    }
        //    var roleName = UserUtil.GetRoleName(HttpContext);

        //   if (roleName != "SA" )
        //    {
        //        return Problem(MessageConstant.BranchMessage.NotRights);
        //    }

        //    var branch = new Branch
        //    {
        //        BranchID = Guid.NewGuid(),
        //        StaffManagerID = branchDto.StaffManagerID,
        //        SalonBranches = branchDto.SalonBranches,
        //        Address = branchDto.Address,
        //        Phone = branchDto.Phone,
        //        InsDate = TimeUtils.GetCurrentSEATime(),
        //        UpdDate = TimeUtils.GetCurrentSEATime(),
        //        DelFlg = true
        //    };

        //    await _branchService.AddBranch(branch);
        //    var reponse = new CreateNewBrachResponse()
        //    {
        //        BranchID = branch.BranchID,
        //        StaffManagerID = branch.StaffManagerID,
        //        SalonBranches = branch.SalonBranches,
        //        Address = branch.Address,
        //        Phone = branch.Phone,
        //    };

        //    return CreatedAtAction(nameof(AddBranch),reponse);
        //}
        [HttpPut(APIEndPointConstant.Branch.UpdateBranch)]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        public async Task<bool> UpdateBranch([FromRoute] Guid id, [FromBody] UpdateBranchRequest branchDto)
        {
            return await _branchService.UpdateBranch(id, branchDto);
        }
        [HttpDelete(APIEndPointConstant.Branch.DeleteBranch)]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        public async Task<IActionResult> RemoveBranch([FromRoute] Guid id)
        {
            await _branchService.RemoveBranch(id);
            return Problem(MessageConstant.BranchMessage.BranchDeleted);
        }

    }
}
