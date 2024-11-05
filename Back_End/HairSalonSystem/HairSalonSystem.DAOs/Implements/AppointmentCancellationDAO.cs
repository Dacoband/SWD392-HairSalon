using HairSalonSystem.BusinessObject;
using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.DAOs.Interfaces;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.DAOs.Implements
{
    public class AppointmentCancellationDAO : IAppointmentCancellationDAO
    {
        private readonly IMongoCollection<AppointmentCancellation> _collection;
        public AppointmentCancellationDAO(HairSalonContext context)
        {
            _collection = context.ApppointmentCancellation;
        }
        public async Task CreateCancellation(AppointmentCancellation cancellation)
        {
            await _collection.InsertOneAsync(cancellation);
        }

       

        public async Task<List<AppointmentCancellation>> GetAll()
        {
            return await _collection.Find(_ => true).ToListAsync();
        }

        public async Task<AppointmentCancellation> GetByAppointmentId(Guid appointmentId)
        {
            return await _collection.Find(x => x.AppointmentId == appointmentId).FirstOrDefaultAsync(); 
        }

        public async Task<AppointmentCancellation> GetByCancellationId(Guid cancellationId)
        {
            return await _collection.Find(x => x.CancellationId == cancellationId).FirstOrDefaultAsync();
        }
    }
}
