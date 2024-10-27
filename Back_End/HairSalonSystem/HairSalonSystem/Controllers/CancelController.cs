using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Services.Constant;
using HairSalonSystem.Services.Controllers;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.PayLoads.Requests.Appointment;
using HairSalonSystem.Services.PayLoads.Requests.Cancellation;
using HairSalonSystem.Services.PayLoads.Responses.Cancellation;
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

        [HttpGet(APIEndPointConstant.CancelAppointment.GetAllCancel)]
        [ProducesResponseType(typeof(AppointmentCancellation), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        [Authorize(Roles = "SA,SM")]

        public async Task<ActionResult<List<CancellationResponse>>> GetAllCancel([FromBody] Pagination query)
        {
            return await _cancelService.GetAll(HttpContext, query);

        }

        [HttpGet(APIEndPointConstant.CancelAppointment.GetById)]
        [ProducesResponseType(typeof(AppointmentCancellation), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        //[Authorize(Roles = "SA,SM")]

        public async Task<ActionResult<CancellationResponse>> GetCancelById([FromRoute] Guid id)
        {
            return await _cancelService.GetById(id, HttpContext);

        }

        [HttpGet(APIEndPointConstant.CancelAppointment.GetByAppointment)]
        [ProducesResponseType(typeof(AppointmentCancellation), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        //[Authorize(Roles = "SA,SM")]

        public async Task<ActionResult<CancellationResponse>> GetCancelByAppointment([FromRoute] Guid id)
        {
            return await _cancelService.GetByAppointment(id, HttpContext);

        }


    }
}

