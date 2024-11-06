using HairSalonSystem.BusinessObject;
using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.DAOs.Interfaces;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.DAOs.Implements
{
    public class StylistDAO : IStylistDAO
    {
        private readonly IMongoCollection<Stylist> _Stylists;
        public StylistDAO(HairSalonContext context)
        {
            _Stylists = context.Stylists;
        }
        public async Task<List<Stylist>> GetAllStylist()
        {
            return await _Stylists.Find(_ => true).ToListAsync();
        }
        public async Task<Stylist> GetStylistById(Guid id)
        {
            return await _Stylists.Find(n => n.StylistId == id).FirstOrDefaultAsync();
        }
        public async Task<Stylist> GetStylistByBranchId(Guid branchId)
        {
            return await _Stylists.Find(n => n.BranchID == branchId).FirstOrDefaultAsync();
        }
        public async Task<Stylist> GetRandomStylistByBranchId(Guid branchId)
        {
            var stylist = await _Stylists.Find(n => n.BranchID == branchId).ToListAsync();
            if (stylist == null || stylist.Count == 0)
                return null;

            var random = new Random();
            var randomIndex = random.Next(stylist.Count);
            return stylist[randomIndex];
        }
        public async Task<List<Stylist>> GetStylistByStaffStylist(Guid staffStylistId)
        {
            return await _Stylists.Find(n => n.StaffStylistId == staffStylistId).ToListAsync();
        }
        public async Task CreateStylist(Stylist Stylist)
        {
            await _Stylists.InsertOneAsync(Stylist);
        }
        public async Task UpdateStylist(Guid id, Stylist Stylist)
        {
            await _Stylists.ReplaceOneAsync(n => n.StylistId == id, Stylist);
        }
        public async Task DeleteStylist(Guid id)
        {
            await _Stylists.DeleteOneAsync(n => n.StylistId == id);
        }
    }
}
