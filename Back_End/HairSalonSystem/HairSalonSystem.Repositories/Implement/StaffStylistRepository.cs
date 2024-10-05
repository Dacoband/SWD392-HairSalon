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
    public class StaffStylistRepository : IStaffStylistRepository
    {
        private readonly IStaffStylistDAO _staffStylistDAO;

        public StaffStylistRepository(IStaffStylistDAO staffStylistDAO)
        {
            _staffStylistDAO = staffStylistDAO;
        }

        public async Task CreateStaffStylist(StaffStylist staffStylist)
        {
            await _staffStylistDAO.CreateStaffStylist(staffStylist);
        }

        public async Task DeleteStaffStylist(Guid id)
        {
            await _staffStylistDAO.DeleteStaffStylist(id);
        }

        public async Task<List<StaffStylist>> GetAllStaffStylists()
        {
            return await _staffStylistDAO.GetAllStaffStylist();
        }

        public async Task<List<StaffStylist>> GetStaffStylistByBranchId(Guid branchId)
        {
            var staffStylist = await _staffStylistDAO.GetStaffStylistByBranchId(branchId);
            return new List<StaffStylist> { staffStylist };
        }

        public async Task<StaffStylist> GetStaffStylistById(Guid id)
        {
            return await _staffStylistDAO.GetStaffStylistById(id);
        }

        public async Task UpdateStaffStylist(Guid id,StaffStylist staffStylist)
        {
            await _staffStylistDAO.UpdateStaffStylist(staffStylist.StaffStylistId, staffStylist);
        }

    }
}
