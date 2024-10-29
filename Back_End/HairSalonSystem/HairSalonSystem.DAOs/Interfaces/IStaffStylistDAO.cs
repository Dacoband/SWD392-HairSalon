using HairSalonSystem.BusinessObject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.DAOs.Interfaces
{
    public interface IStaffStylistDAO
    {
        Task CreateStaffStylist(StaffStylist staffStylist);
        Task<StaffStylist> GetStaffStylistById(Guid id);
        Task<StaffStylist> GetStaffStylistByAccountId(Guid id);
        Task<List<StaffStylist>> GetAllStaffStylist();
        Task UpdateStaffStylist(Guid id, StaffStylist staffStylist);
        Task DeleteStaffStylist(Guid id);
        Task<StaffStylist> GetStaffStylistByBranchId(Guid branchId);

    }
}
