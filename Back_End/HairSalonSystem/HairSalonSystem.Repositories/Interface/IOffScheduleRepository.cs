using HairSalonSystem.BusinessObject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Repositories.Interface
{
    public interface IOffScheduleRepository
    {
        Task CreateSchedule(OffSchedule offSchedule);
        Task<List<OffSchedule>> GetAll();
        Task<OffSchedule> GetByOffScheduleId(Guid id);
        Task DeleteOffSchedule(Guid id);
    }
}
