using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Services.Constant;
using HairSalonSystem.Services.Controllers;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.PayLoads.Requests.Appointment;
using HairSalonSystem.Services.PayLoads.Requests.Cancellation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HairSalonSystem.API.Controllers
{
    public class CancelController : BaseController<CancelController>
    {
        private readonly IAppointmentCacellationService _cancelService;
        public CancelController(ILogger<CancelController> logger, IAppointmentCacellationService cancelService) : base(logger)
        {
            _cancelService = cancelService;
        }

        [HttpPost(APIEndPointConstant.CancelAppointment.CreateCancel)]
        [ProducesResponseType(typeof(AppointmentCancellation), StatusCodes.Status201Created)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        [Authorize(Roles = "MB,SL,ST")]

        public async Task<ActionResult<AppointmentCancellation>> CreateCancel([FromBody] CreateCancellationReq request)
        {
            return await _cancelService.CreateCancellation(request, HttpContext);

        }
    }
}
