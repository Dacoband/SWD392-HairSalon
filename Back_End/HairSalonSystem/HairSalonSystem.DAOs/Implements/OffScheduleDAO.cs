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
    }
}
