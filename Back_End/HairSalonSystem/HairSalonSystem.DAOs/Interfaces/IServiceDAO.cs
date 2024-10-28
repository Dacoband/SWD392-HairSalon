using HairSalonSystem.BusinessObject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.DAOs.Interfaces
{
    public interface IServiceDAO
    {
        Task<List<Service>> GetAllService();
        Task<Service> GetServiceById(Guid serviceId);
        Task CreateService(Service service); 
        Task DeleteService(Guid serviceId);
        Task UpdateService(Service service);

    }
}
