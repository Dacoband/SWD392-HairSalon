using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Services.PayLoads.Requests.Cancellation;
using HairSalonSystem.Services.PayLoads.Responses.Cancellation;
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
        Task<ActionResult<List<CancellationResponse>>> GetAll(HttpContext context, Pagination query);
        Task<ActionResult<CancellationResponse>> GetByAppointment(Guid appointmentId, HttpContext context);
        Task<ActionResult<CancellationResponse>> GetById(Guid cancellatonId, HttpContext context);

    }
}
