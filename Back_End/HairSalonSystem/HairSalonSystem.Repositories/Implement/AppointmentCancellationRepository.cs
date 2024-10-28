using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.DAOs.Interfaces;
using HairSalonSystem.Repositories.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Repositories.Implement
{
    public class AppointmentCancellationRepository : IAppointmentCancellationRepository
    {
        private readonly IAppointmentCancellationDAO _appointmentCancellationDAO;
        public AppointmentCancellationRepository(IAppointmentCancellationDAO appointmentCancellationDAO)
        {
            _appointmentCancellationDAO = appointmentCancellationDAO;
        }
        public async Task CreateCancellation(AppointmentCancellation cancellation)
        {
            await _appointmentCancellationDAO.CreateCancellation(cancellation);
        }

       
        public async Task<List<AppointmentCancellation>> GetAll()
        {
            return await _appointmentCancellationDAO.GetAll();
        }

        public async Task<AppointmentCancellation> GetByAppointmentId(Guid appointmentId)
        {
           return await _appointmentCancellationDAO.GetByAppointmentId(appointmentId);
        }

        public async Task<AppointmentCancellation> GetByCancellationId(Guid cancellationId)
        {
            return await _appointmentCancellationDAO.GetByCancellationId(cancellationId);
        }
    }
}
