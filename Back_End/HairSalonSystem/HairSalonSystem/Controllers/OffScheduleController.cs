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
    }
}
