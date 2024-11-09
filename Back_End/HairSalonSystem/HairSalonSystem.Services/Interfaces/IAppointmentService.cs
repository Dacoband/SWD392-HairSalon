using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Services.PayLoads.Requests.Appointment;
using HairSalonSystem.Services.PayLoads.Responses.Appointment;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HairSalonSystem.Services.Interfaces
{
    public interface IAppointmentService
    {
        Task<ActionResult<Appointment>> CreateAppointment(CreateAppointmentRequest request, HttpContext context);
        Task<ActionResult<AppointmentResponse>> GetAppointmentById(Guid id,HttpContext context);
        Task<ActionResult> UpdateAppointmentStatus(Guid appointmentId,int status, HttpContext context);
        Task<ActionResult<List<AppointmentResponse>>> GetAppointmentList(QueryAppointment query, HttpContext context);
        Task<ActionResult<List<DateTime>>> GetSuitableSlot(QuerySlot request, HttpContext context);
        Task<ActionResult<Stylist>> GetSuitableStylist(QueryStylist query, HttpContext context);
        Task<ActionResult<Dictionary<Guid, decimal>>> GetTotalRevenueForAllBranches(HttpContext context);


    }
}
