using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Services.Constant;
using HairSalonSystem.Services.Controllers;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.PayLoads.Requests.StaffManagers;
using HairSalonSystem.Services.PayLoads.Responses.StaffManagers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
namespace HairSalonSystem.API.Controllers
{
    [ApiController]
    public class StaffManagerController : BaseController<StaffManagerController>
    {
         private readonly IStaffManagerService _staffManagerService;
        public StaffManagerController(ILogger<StaffManagerController> logger, IStaffManagerService staffManagerService) : base(logger)
        {
            _staffManagerService = staffManagerService;
        }
        [HttpGet(APIEndPointConstant.StaffManager.GetStaffManagerById)]
        [ProducesResponseType(typeof(StaffManager), StatusCodes.Status200OK)]
        public async Task<ActionResult<StaffManager>> GetStaffManagerById(Guid id)
        {
            var staffManager = await _staffManagerService.GetStaffManagerById(id);
            if (staffManager == null)
            {
                return NotFound();
            }
            return Ok(staffManager);
        }
        [HttpGet(APIEndPointConstant.StaffManager.GetAllStaffManagers)]
        [ProducesResponseType(typeof(List<StaffManager>), StatusCodes.Status200OK)]
        public async Task<ActionResult<List<StaffManager>>> GetAllStaffManagers()
        {
            var staffManagers = await _staffManagerService.GetAllStaffManagers();
            return Ok(staffManagers);
        }
        [HttpPost(APIEndPointConstant.StaffManager.AddStaffManager)]
        [ProducesResponseType(typeof(CreateNewStaffManagerResponse), StatusCodes.Status201Created)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        public async Task<ActionResult> AddStaffManager([FromForm] CreateNewStaffManagerRequest staffManagerDto)
        {
            return await _staffManagerService.AddStaffManager(staffManagerDto, HttpContext);
        }
        [HttpPatch(APIEndPointConstant.StaffManager.UpdateStaffManager)]
        [ProducesResponseType(typeof(UpdateStaffManagerResponse), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        public async Task<ActionResult> UpdateStaffManager([FromRoute] Guid id,[FromForm] UpdateStaffManagerRequest staffManagerDto)
        {
            return await _staffManagerService.UpdateStaffManager(id,staffManagerDto, HttpContext);
        }
        [HttpDelete(APIEndPointConstant.StaffManager.DeleteStaffManager)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        public async Task<ActionResult> DeleteStaffManager(Guid id)
        {
            await _staffManagerService.RemoveStaffManager(id);
            return NoContent();
        }
    }
}
