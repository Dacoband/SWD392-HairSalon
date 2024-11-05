using HairSalonSystem.BusinessObject;
using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.DAOs.Interfaces;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HairSalonSystem.DAOs.Implements
{
    public class SalaryStylistDAO : BaseDAO<SalaryStylist>, ISalaryStylistDAO
    {
        public SalaryStylistDAO(HairSalonContext context)
            : base(context.SalaryStylist) // Truyền collection BaseSalaries vào BaseDAO
        {
        }

        // CreateSalaryStylist
        public async Task CreateSalaryStylistAsync(SalaryStylist salaryStylist)
        {
            await AddAsync(salaryStylist);
        }

        // UpdateSalaryStylist
        public async Task UpdateSalaryStylistAsync(SalaryStylist salaryStylist)
        {
            var filter = Builders<SalaryStylist>.Filter.Eq(s => s.SalaryStylistID, salaryStylist.SalaryStylistID);
            var update = Builders<SalaryStylist>.Update
                .Set(s => s.StylistID, salaryStylist.StylistID)
                .Set(s => s.BaseSalary, salaryStylist.BaseSalary)
                .Set(s => s.CommissionPercentage, salaryStylist.CommissionPercentage)
                .Set(s => s.TotalEarnings, salaryStylist.TotalEarnings)
                .Set(s => s.PaymentDate, salaryStylist.PaymentDate)
                .Set(s => s.UpdDate, salaryStylist.UpdDate)
                .Set(s => s.DelFlg, salaryStylist.DelFlg);

            await UpdateAsync(filter, update);
        }

        // DeleteSalaryStylist
        public async Task DeleteSalaryStylistAsync(Guid salaryStylistID)
        {
            var filter = Builders<SalaryStylist>.Filter.Eq(s => s.SalaryStylistID, salaryStylistID);
            var update = Builders<SalaryStylist>.Update.Set(s => s.DelFlg, true); // Xóa mềm (soft delete)
            await UpdateAsync(filter, update);
        }

        // GetSalaryByStylistID
        public async Task<SalaryStylist> GetSalaryByStylistIDAsync(Guid stylistID)
        {
            var filter = Builders<SalaryStylist>.Filter.Eq(s => s.StylistID, stylistID)
                        & Builders<SalaryStylist>.Filter.Eq(s => s.DelFlg, false); // Chỉ lấy những bản ghi chưa bị xóa
            return await GetByIdAsync(filter);
        }

        // GetAllSalaryStylist
        public async Task<List<SalaryStylist>> GetAllSalaryStylistAsync()
        {
            var filter = Builders<SalaryStylist>.Filter.Eq(s => s.DelFlg, false); // Lọc các bản ghi chưa bị xóa
            return await GetAllAsync(filter);
        }
    }
}
