using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Services.Constant;
using HairSalonSystem.Services.Controllers;
using HairSalonSystem.Services.Implements;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.PayLoads.Requests.Appointment;
using HairSalonSystem.Services.PayLoads.Requests.Service;
using HairSalonSystem.Services.PayLoads.Responses.Appointment;
using HairSalonSystem.Services.PayLoads.Responses.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HairSalonSystem.API.Controllers
{
    [ApiController]
    public class AppointmentController : BaseController<AppointmentController>
    {
        private readonly IAppointmentService _appointmentService;

        public AppointmentController(ILogger<AppointmentController> logger, IAppointmentService appointmentService) : base(logger)
        {
            _appointmentService = appointmentService;
        }

        [HttpPost]
        [Route(APIEndPointConstant.Appointment.CreateAppointment)]
        [ProducesResponseType(typeof(Appointment), StatusCodes.Status201Created)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        [Authorize(Roles = "MB")]
        public async Task<ActionResult<Appointment>> CreateAppointment([FromBody] CreateAppointmentRequest request)
        {
            var result = await _appointmentService.CreateAppointment(request, HttpContext);
            return result;
        }

        [HttpGet]
        [Route(APIEndPointConstant.Appointment.GetAppointmentById)]
        [ProducesResponseType(typeof(AppointmentResponse), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        [Authorize(Roles = "SL,ST,SA")]
        public async Task<ActionResult<AppointmentResponse>> GetAppointmentById([FromRoute] Guid id)
        {
            var result = await _appointmentService.GetAppointmentById(id, HttpContext);
            return result;
        }

        [HttpGet]
        [Route(APIEndPointConstant.Appointment.GetAllAppointment)]
        [ProducesResponseType(typeof(List<AppointmentResponse>), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        [Authorize(Roles = "MB,SL,ST,SA")]
        public async Task<ActionResult<List<AppointmentResponse>>> GetAppointments([FromQuery] QueryAppointment query)
        {
            var result = await _appointmentService.GetAppointmentList(query, HttpContext);
            return result;
        }

        [HttpPatch]
        [Route(APIEndPointConstant.Appointment.UpdateAppointment)]
        [ProducesResponseType(typeof(Appointment), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        [Authorize(Roles = "MB,SL,ST,SA")]
        public async Task<ActionResult<Appointment>> UpdateAppointment([FromRoute] Guid id, [FromBody] int status)
        {
            var result = await _appointmentService.UpdateAppointmentStatus(id, status, HttpContext);
            return result;
        }

        [HttpGet]
        [Route(APIEndPointConstant.Appointment.GetSuitableSlot)]
        [ProducesResponseType(typeof(List<DateTime>), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        public async Task<ActionResult<List<DateTime>>> GetSlots([FromQuery] QuerySlot query)
        {
            var result = await _appointmentService.GetSuitableSlot(query, HttpContext);
            return result;
        }
    }
}
