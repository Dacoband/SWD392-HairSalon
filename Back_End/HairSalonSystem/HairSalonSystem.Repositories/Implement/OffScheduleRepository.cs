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
    public class OffScheduleRepository : IOffScheduleRepository
    {
        private readonly IOffScheduleDAO _offScheduleDAO;
        
        public async Task CreateSchedule(OffSchedule offSchedule)
        {
           await _offScheduleDAO.CreateSchedule(offSchedule);
        }

        public async Task DeleteOffSchedule(Guid id)
        {
           await _offScheduleDAO.DeleteOffSchedule(id);
        }

        public async Task<List<OffSchedule>> GetAll()
        {
            return await _offScheduleDAO.GetAll();
        }

        public async Task<OffSchedule> GetByOffScheduleId(Guid id)
        {
            return await _offScheduleDAO.GetByOffScheduleId(id);
        }

        public async Task<List<OffSchedule>> GetOffScheduleByStylist(Guid stylistId)
        {
            return await _offScheduleDAO.GetOffScheduleByStylist(stylistId);
        }

        public async Task<List<OffSchedule>> GetOffScheduleInDate(Guid id, DateTime date)
        {
            return await _offScheduleDAO.GetOffScheduleInDate(id, date);
        }

        public Task<List<OffSchedule>> GetOffScheduleInMonth(Guid id, DateTime date)
        {
            return _offScheduleDAO.GetOffScheduleInMonth(id, date);
        }
    }
}
