using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.DAOs.Implements;
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
    public class AppointmentServiceRepository : IAppointmentServiceRepository
    {
        private readonly IAppointmentServiceDAO _appointmentServiceDAO;
        public AppointmentServiceRepository(IAppointmentServiceDAO appointmentServiceDAO)
        {
            _appointmentServiceDAO = appointmentServiceDAO;
        }
        public async Task CreateAppointmentService(AppointmentService appointmentService, IClientSessionHandle session = null)
        {
            await _appointmentServiceDAO.CreateAppointmentService(appointmentService);
        }

        public async Task<List<AppointmentService>> GetAll()
        {
           return await _appointmentServiceDAO.GetAll();
        }

        public async Task<List<AppointmentService>> GetByAppointmentId(Guid appointmentId)
        {
            return await _appointmentServiceDAO.GetByAppointmentId(appointmentId);
        }
    }
}
