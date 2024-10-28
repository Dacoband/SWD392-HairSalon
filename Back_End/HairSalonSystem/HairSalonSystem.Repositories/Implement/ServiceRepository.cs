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
    public class ServiceRepository : IServiceRepository
    {
        private readonly IServiceDAO _serviceDAO;
        public ServiceRepository(IServiceDAO serviceDAO)
        {
            _serviceDAO = serviceDAO;
        }
        public async Task CreateService(Service service)
        {
           await _serviceDAO.CreateService(service);
        }

        public async Task DeleteService(Guid serviceId)
        {
           await _serviceDAO.DeleteService(serviceId);
        }

        public async Task<List<Service>> GetAllService()
        {
            return await _serviceDAO.GetAllService();
        }

        public async Task<Service> GetServiceById(Guid serviceId)
        {
            return await _serviceDAO.GetServiceById(serviceId);
        }

        public async Task UpdateService(Service service)
        {
            await _serviceDAO.UpdateService(service);
        }
    }
}
