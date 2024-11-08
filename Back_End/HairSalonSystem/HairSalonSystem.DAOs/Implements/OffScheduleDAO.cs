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
    public class OffScheduleDAO : IOffScheduleDAO
    {
        private readonly IMongoCollection<OffSchedule> _offSchedule;

        public OffScheduleDAO(HairSalonContext context)
        {
            _offSchedule = context.OffSchedule;
        }

        public async Task CreateSchedule(OffSchedule offSchedule)
        {
            await _offSchedule.InsertOneAsync(offSchedule);
        }

        public async Task DeleteOffSchedule(Guid id)
        {
            var filter = Builders<OffSchedule>.Filter.Eq(x => x.OffScheduleId, id);
            var update = Builders<OffSchedule>.Update.Set(x => x.DelFlg, false);

            await _offSchedule.UpdateOneAsync(filter, update);
        }

        public async Task<List<OffSchedule>> GetAll()
        {
            return await _offSchedule.Find(_ => true).ToListAsync();
        }

        public async Task<OffSchedule> GetByOffScheduleId(Guid id)
        {
            return await _offSchedule.Find(x => x.OffScheduleId == id).FirstOrDefaultAsync();
        }

        public async Task<List<OffSchedule>> GetOffScheduleByStylist(Guid stylistId)
        {
            return await _offSchedule.Find(x => x.StylistId == stylistId && x.DelFlg == true).ToListAsync();
        }

        public async Task<List<OffSchedule>> GetOffScheduleInDate(Guid id, DateTime date)
        {
            return await _offSchedule
                .Find(x => x.StylistId == id && x.OffDate.Date == date.Date && x.DelFlg == true)
                .ToListAsync();
        }

        public async Task<List<OffSchedule>> GetOffScheduleInMonth(Guid id, DateTime date)
        {
            var startMonth = new DateTime(date.Year, date.Month, 1);
            var endMonth = startMonth.AddMonths(1).AddDays(-1);
            return await _offSchedule.Find(x => x.StylistId == id && x.OffDate >= startMonth && x.OffDate <= endMonth && x.DelFlg == true).ToListAsync();
        }
    }
}
