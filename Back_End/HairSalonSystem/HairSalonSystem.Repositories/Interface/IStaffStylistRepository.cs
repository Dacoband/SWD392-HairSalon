using HairSalonSystem.BusinessObject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Repositories.Interface
{
    public interface IStaffStylistRepository
    {
        Task CreateStaffStylist(StaffStylist staffStylist);
        Task<StaffStylist> GetStaffStylistById(Guid id);
        Task<StaffStylist> GetStaffStylistByAccountId(Guid accountId);
        Task<List<StaffStylist>> GetAllStaffStylists();
        Task UpdateStaffStylist(Guid id, StaffStylist staffStylist);
        Task DeleteStaffStylist(Guid id);
        Task<List<StaffStylist>> GetStaffStylistByBranchId(Guid branchId);
    }
}
