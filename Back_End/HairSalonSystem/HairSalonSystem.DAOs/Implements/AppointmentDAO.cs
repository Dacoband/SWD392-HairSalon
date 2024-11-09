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
        private readonly IMongoCollection<Stylist> _stylistCollection;


        public AppointmentDAO(HairSalonContext context)
        {
            _appointmentCollection = context.Appointment;
            _stylistCollection = context.Stylists;
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
        public async Task<Dictionary<Guid, decimal>> GetTotalRevenueForAllBranches()
        {
            // Step 1: Get the list of all stylists with corresponding branchId
            var allStylists = await _stylistCollection.Find(_ => true).ToListAsync();
            var branchStylistMap = allStylists.ToDictionary(s => s.StylistId, s => s.BranchID);

            // Step 2: Find all appointments and group by branchId
            var appointments = await _appointmentCollection.Find(_ => true).ToListAsync();

            // Step 3: Group and sum TotalPrice for each branchId
            var revenueByBranch = appointments
                .Where(a => branchStylistMap.ContainsKey(a.StylistId)) // Filter only valid Appointments with valid Stylists
                .GroupBy(a => branchStylistMap[a.StylistId])           // Group by branchId
                .ToDictionary(
                    g => g.Key,                                        // branchId
                    g => g.Sum(a => (decimal)a.TotalPrice)             // Sum revenue for branchId, cast TotalPrice to decimal
                );

            return revenueByBranch; 
        }


    }
}
