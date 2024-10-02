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
    public class StylistRepository : IStylistRepository
    {
        private readonly IStylistDAO _stylistDAO;
        public StylistRepository(IStylistDAO stylistDAO)
        {
            _stylistDAO = stylistDAO;
        }
        public async Task CreateStylist(Stylist Stylist)
        {
            await _stylistDAO.CreateStylist(Stylist);
        }
        public async Task DeleteStylist(Guid id)
        {
            await _stylistDAO.DeleteStylist(id);
        }
        public async Task<List<Stylist>> GetAllStylist()
        {
            return await _stylistDAO.GetAllStylist();
        }
        public async Task<List<Stylist>> GetStylistByBranchId(Guid branchId)
        {
            var stylist = await _stylistDAO.GetStylistByBranchId(branchId);
            return new List<Stylist> { stylist };
        }
        public async Task<Stylist> GetStylistById(Guid id)
        {
            return await _stylistDAO.GetStylistById(id);
        }
        public async Task UpdateStylist(Guid id, Stylist Stylist)
        {
            await _stylistDAO.UpdateStylist(Stylist.StylistId, Stylist);
        }
        public async Task<List<Stylist>> GetStylistByStaffStylist(Guid staffStylistId)
        {
            return await _stylistDAO.GetStylistByStaffStylist(staffStylistId);
        }
    }
}
