using HairSalonSystem.BusinessObject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.DAOs.Interfaces
{
    public interface IAppointmentDAO
    {
        Task CreateAppointment(Appointment appointment);
        Task UpdateAppointmentStatus(Guid appointmentId, int status);
        Task UpdateAppointment(Appointment appointment);
        Task<List<Appointment>> GetAllAppointment();
        Task<Appointment> GetAppointmentById(Guid appointmentId);
       

    }
}
