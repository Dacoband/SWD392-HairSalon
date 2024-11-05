using HairSalonSystem.BusinessObject.Entities;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Repositories.Interface
{
    public interface IAppointmentServiceRepository
    {
        Task CreateAppointmentService(AppointmentService appointmentService, IClientSessionHandle session = null);
        Task<List<AppointmentService>> GetAll();
        Task<List<AppointmentService>> GetByAppointmentId(Guid appointmentId);
    }
}
