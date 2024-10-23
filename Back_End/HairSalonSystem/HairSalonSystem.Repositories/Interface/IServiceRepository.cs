using HairSalonSystem.BusinessObject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Repositories.Interface
{
    public interface IServiceRepository
    {
        Task<List<Service>> GetAllService();
        Task<Service> GetServiceById(Guid serviceId);
        Task CreateService(Service service);
        Task DeleteService(Guid serviceId);
        Task UpdateService(Service service);
    }
}
