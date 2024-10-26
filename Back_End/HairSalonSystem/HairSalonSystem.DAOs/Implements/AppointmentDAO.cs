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
    public class AppointmentDAO : IAppointmentDAO
    {
        private readonly IMongoCollection<Appointment> _appointmentCollection;
        private readonly IMongoCollection<AppointmentService> _appointmentServiceCollection;

        public AppointmentDAO(HairSalonContext context)
        {
            _appointmentCollection = context.Appointment;
        }
        public async Task CreateAppointment(Appointment appointment, IClientSessionHandle session = null)
        {
            if (session == null)
            {
                await _appointmentCollection.InsertOneAsync(appointment);
            }
            else
            {
                await _appointmentCollection.InsertOneAsync(session, appointment);
            }
        }

        public async Task<List<Appointment>> GetAllAppointment()
        {
            return await _appointmentCollection.Find(_ => true).ToListAsync();
        }

        public async Task<Appointment> GetAppointmentById(Guid appointmentId)
        {
            return await _appointmentCollection.Find(x => x.AppointmentId == appointmentId).FirstOrDefaultAsync();
        }

        public async Task UpdateAppointment(Appointment appointment)
        {
            await _appointmentCollection.ReplaceOneAsync(x => x.AppointmentId == appointment.AppointmentId, appointment);
        }

        public async Task UpdateAppointmentStatus(Guid appointmentId, int status)
        {
            var filter = Builders<Appointment>.Filter.Eq(x => x.AppointmentId, appointmentId);
            var update = Builders<Appointment>.Update.Set(x => x.Status, status);

            await _appointmentCollection.UpdateOneAsync(filter, update);
        }
    }
}
