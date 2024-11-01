using HairSalonSystem.BusinessObject;
using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.DAOs.Interfaces;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.DAOs.Implements
{
    public class StaffStylistDAO : IStaffStylistDAO
    {
        private readonly IMongoCollection<StaffStylist> _staffStylists;
        public StaffStylistDAO(HairSalonContext context)
        {
            _staffStylists = context.StaffStylists;
        }

        public async Task CreateStaffStylist(StaffStylist staffStylist)
        {
            await _staffStylists.InsertOneAsync(staffStylist);
        }

        public async Task DeleteStaffStylist(Guid id)
        {
            await _staffStylists.DeleteOneAsync(n => n.StaffStylistId == id);
        }

        public async Task<List<StaffStylist>> GetAllStaffStylist()
        {
            return await _staffStylists.Find(_ => true).ToListAsync();
        }

        public async Task<StaffStylist> GetStaffStylistByAccountId(Guid accountId)
        {
            return await _staffStylists.Find(n => n.AccountId == accountId).FirstOrDefaultAsync();
        }

        public async Task<StaffStylist> GetStaffStylistByBranchId(Guid branchId)
        {
            return await _staffStylists.Find(n => n.BranchID == branchId).FirstOrDefaultAsync();
        }

        public async Task<StaffStylist> GetStaffStylistById(Guid id)
        {
            return await _staffStylists.Find(n => n.StaffStylistId == id).FirstOrDefaultAsync();
        }

        public async Task UpdateStaffStylist(Guid id, StaffStylist staffStylist)
        {
            await _staffStylists.ReplaceOneAsync(n => n.StaffStylistId == id, staffStylist);
        }
    }
}
