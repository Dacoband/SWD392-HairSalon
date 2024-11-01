using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Services.PayLoads.Requests.Appointment;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HairSalonSystem.Services.Interfaces
{
    public interface IAppointmentService
    {
        Task<ActionResult<Appointment>> CreateAppointment(CreateAppointmentRequest request, HttpContext context);
        Task<ActionResult<Appointment>> GetAppointmentById(Guid id,HttpContext context);
        Task<ActionResult> UpdateAppointmentStatus(Guid appointmentId,int status, HttpContext context);
        Task<ActionResult<List<Appointment>>> GetAppointmentList(QueryAppointment query, HttpContext context);
        
    }
}
