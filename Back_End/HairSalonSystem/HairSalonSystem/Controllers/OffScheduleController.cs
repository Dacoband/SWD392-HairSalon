using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Services.Constant;
using HairSalonSystem.Services.Controllers;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.PayLoads.Requests.Appointment;
using HairSalonSystem.Services.PayLoads.Requests.OffSchedule;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HairSalonSystem.API.Controllers
{
    [ApiController]
    public class OffScheduleController : BaseController<OffScheduleController>
    {
        private readonly IOffScheduleService _offScheduleService;

        public OffScheduleController(ILogger<OffScheduleController> logger, IOffScheduleService offScheduleService) : base(logger)
        {
            _offScheduleService = offScheduleService;
        }

        [HttpPost]
        [Route(APIEndPointConstant.OffSchedule.CreateOffSchedule)]
        [ProducesResponseType(typeof(OffSchedule), StatusCodes.Status201Created)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        [Authorize(Roles = "SL")]
        public async Task<ActionResult<OffSchedule>> CreateOffSchedule([FromBody] CreateOffScheduleRequest request)
        {
            var result = await _offScheduleService.CreateOffSchedule(request, HttpContext);
            return result;
        }

        [HttpGet]
        [Route(APIEndPointConstant.OffSchedule.GetAllOffSchedule)]
        [ProducesResponseType(typeof(List<OffSchedule>), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        [Authorize]
        public async Task<ActionResult<List<OffSchedule>>> GetOffSchedule([FromQuery] OffScheduleQuery query)
        {
            var result = await _offScheduleService.GetAllSchedule(query, HttpContext);
            return result;
        }
        [HttpPatch]
        [Route(APIEndPointConstant.OffSchedule.DeleteOffSchedule)]
        [ProducesResponseType(typeof(OffSchedule), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        [Authorize]
        public async Task<ActionResult<OffSchedule>> DeleteOffSchedule([FromRoute] Guid id)
        {
            var result = await _offScheduleService.DeleteSchedule(id, HttpContext);
            return result;
        }

        [HttpGet]
        [Route(APIEndPointConstant.OffSchedule.GetOffScheduleById)]
        [ProducesResponseType(typeof(OffSchedule), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        [Authorize]
        public async Task<ActionResult<OffSchedule>> GetOffScheduleById([FromRoute] Guid id)
        {
            var result = await _offScheduleService.GetScheduleById(id, HttpContext);
            return result;
        }


    }
}
