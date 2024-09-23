using Amazon.Runtime;
using HairSalonSystem.API.Constant;
using HairSalonSystem.API.PayLoads.Requests.Branchs;
using HairSalonSystem.API.PayLoads.Responses.Branchs;
using HairSalonSystem.API.Util;
using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Services.Interfaces;
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
        public async Task<ActionResult<Branch>> GetBranchById(Guid id)
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
                DelFlg = false
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

    }
}
