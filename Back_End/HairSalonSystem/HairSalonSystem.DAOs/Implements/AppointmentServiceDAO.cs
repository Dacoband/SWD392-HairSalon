using HairSalonSystem.BusinessObject;
using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.DAOs.Interfaces;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.DAOs.Implements
{
    public class AppointmentServiceDAO : IAppointmentServiceDAO
    {
        private readonly IMongoCollection<AppointmentService> _appointmentServiceCollection;

        public AppointmentServiceDAO(HairSalonContext context)
        {
            _appointmentServiceCollection = context.AppointmentService;
        }
        public async Task CreateAppointmentService(AppointmentService appointmentService, IClientSessionHandle session = null)
        {
            if (session == null)
            {
                await _appointmentServiceCollection.InsertOneAsync(appointmentService);
            }
            else
            {
                await _appointmentServiceCollection.InsertOneAsync(session, appointmentService);
            }
        }

        public async Task<List<AppointmentService>> GetAll()
        {
           return await _appointmentServiceCollection.Find(_ => true).ToListAsync();
        }

        public async Task<List<AppointmentService>> GetByAppointmentId(Guid appointmentId)
        {
          return await  _appointmentServiceCollection.Find(x => x.AppointmentId == appointmentId).ToListAsync();
        }
    }
}
