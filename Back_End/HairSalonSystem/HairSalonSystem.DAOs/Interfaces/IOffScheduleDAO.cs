using HairSalonSystem.BusinessObject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.DAOs.Interfaces
{
    public interface IOffScheduleDAO
    {
        Task CreateSchedule(OffSchedule offSchedule);
        Task<List<OffSchedule>> GetAll();
        Task<OffSchedule> GetByOffScheduleId(Guid id);
        Task DeleteOffSchedule(Guid id);
        Task<List<OffSchedule>> GetOffScheduleByStylist(Guid stylistId);
        Task<List<OffSchedule>> GetOffScheduleInDate(Guid id, DateTime date);
        Task<List<OffSchedule>> GetOffScheduleInMonth(Guid id, DateTime date);
    }
}
