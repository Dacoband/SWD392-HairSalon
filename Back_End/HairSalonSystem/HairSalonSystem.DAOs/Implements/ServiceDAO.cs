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
    public class ServiceDAO : IServiceDAO
    {
        private readonly IMongoCollection<Service> _serviceCollection;

        public ServiceDAO(HairSalonContext context)
        {
            _serviceCollection = context.Service;
            
        }
        public async Task CreateService(Service service)
        {
            await _serviceCollection.InsertOneAsync(service);
        }

        public async Task DeleteService(Guid serviceId)
        {
            var update = Builders<Service>.Update.Set(x => x.DelFlg, false);
            await _serviceCollection.FindOneAndUpdateAsync(x => x.ServiceID == serviceId,update);
        }

        public async Task<List<Service>> GetAllService()
        {
            return await _serviceCollection.Find(_ => true).ToListAsync();
        }

        public async Task<Service> GetServiceById(Guid serviceId)
        {
            return await _serviceCollection.Find(x => x.ServiceID == serviceId).FirstOrDefaultAsync();
        }

        public Task UpdateService(Service service)
        {
            return _serviceCollection.ReplaceOneAsync(x => x.ServiceID == service.ServiceID, service);
        }
    }
}
