using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.DAOs.Interfaces;
using HairSalonSystem.Repositories.Interface;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Repositories.Implement
{
    public class AppointmentRepository : IAppointmentRepository
    {
        private readonly IAppointmentDAO _appointmentDAO;
        public AppointmentRepository(IAppointmentDAO appointmentDAO)
        {
            _appointmentDAO = appointmentDAO;
        }
        public async Task CreateAppointment(Appointment appointment, IClientSessionHandle session = null)
        {
          await  _appointmentDAO.CreateAppointment(appointment);
        }

        public async Task<List<Appointment>> GetAllAppointment()
        {
            return await _appointmentDAO.GetAllAppointment();
        }

        public async Task<Appointment> GetAppointmentById(Guid appointmentId)
        {
            return await _appointmentDAO.GetAppointmentById(appointmentId);
        }

        public async Task UpdateAppointment(Appointment appointment)
        {
            await _appointmentDAO.UpdateAppointment(appointment);
        }

        public async Task UpdateAppointmentStatus(Guid appointmentId, int status)
        {
            await _appointmentDAO.UpdateAppointmentStatus(appointmentId, status);
        }
    }
}
