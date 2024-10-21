using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Services.PayLoads.Requests.Cancellation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.Interfaces
{
    public interface IAppointmentCacellationService
    {
        Task<ActionResult<AppointmentCancellation>> CreateCancellation(CreateCancellationReq req, HttpContext context);
        Task<ActionResult<List<AppointmentCancellation>>> GetAll(HttpContext context);
        Task<ActionResult<AppointmentCancellation>> GetByAppointment(Guid appointmentId, HttpContext context);
        Task<ActionResult<AppointmentCancellation>> GetById(Guid cancellatonId, HttpContext context);

    }
}
