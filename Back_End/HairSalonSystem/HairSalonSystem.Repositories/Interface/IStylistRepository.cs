using HairSalonSystem.BusinessObject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Repositories.Interface
{
    public interface IStylistRepository
    {
        Task CreateStylist(Stylist Stylist);
        Task<Stylist> GetStylistById(Guid id);
        Task<List<Stylist>> GetAllStylist();
        Task UpdateStylist(Guid id, Stylist Stylist);
        Task DeleteStylist(Guid id);
        Task<List<Stylist>> GetStylistByBranchId(Guid branchId);
        Task<List<Stylist>> GetStylistByStaffStylist(Guid staffStylistId);
    }
}
