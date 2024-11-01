using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Services.Constant;
using HairSalonSystem.Services.Controllers;
using HairSalonSystem.Services.Implements;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.PayLoads.Requests.Appointment;
using HairSalonSystem.Services.PayLoads.Requests.Service;
using HairSalonSystem.Services.PayLoads.Responses.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HairSalonSystem.API.Controllers
{
    [ApiController]
    public class AppointmentController : BaseController<AppointmentController>
    {
        private readonly IAppointmentService _appointmentService;
        public AppointmentController(ILogger<AppointmentController> logger,IAppointmentService appointmentService) :base(logger)
        {
            _appointmentService = appointmentService;
        }

        [HttpPost(APIEndPointConstant.Appointment.CreateAppointment)]
        [ProducesResponseType(typeof(Appointment), StatusCodes.Status201Created)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        [Authorize(Roles = "MB")]

        public async Task<ActionResult<Appointment>> CreateService([FromBody] CreateAppointmentRequest request)
        {
            return await _appointmentService.CreateAppointment(request,HttpContext);

        }

        [HttpGet(APIEndPointConstant.Appointment.GetAppointmentById)]
        [ProducesResponseType(typeof(Service), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        [Authorize]

        public async Task<ActionResult<Appointment>> GetAppointmentById([FromRoute] Guid id)
        {
            return await _appointmentService.GetAppointmentById(id,HttpContext);
        }

        [HttpGet(APIEndPointConstant.Appointment.GetAllAppointment)]
        [ProducesResponseType(typeof(Service), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        [Authorize]

        public async Task<ActionResult<List<Appointment>>> GetAppointments([FromQuery] QueryAppointment query)
        {
            return await _appointmentService.GetAppointmentList(query,HttpContext);
        }


        [HttpPatch(APIEndPointConstant.Appointment.UpdateAppointment)]
        [ProducesResponseType(typeof(Service), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        [Authorize(Roles = "MB,SL,ST")]

        public async Task<ActionResult<Appointment>> UpdateAppointment([FromRoute] Guid id, [FromBody] int status)
        {
            return await _appointmentService.UpdateAppointmentStatus(id,status,HttpContext);
        }
    }
}
