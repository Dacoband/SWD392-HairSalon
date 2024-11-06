using HairSalonSystem.BusinessObject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.DAOs.Interfaces
{
    public interface IStylistDAO
    {
        Task CreateStylist(Stylist Stylist);
        Task<Stylist> GetStylistById(Guid id);
        Task<List<Stylist>> GetAllStylist();
        Task UpdateStylist(Guid id, Stylist Stylist);
        Task DeleteStylist(Guid id);
        Task<Stylist> GetStylistByBranchId(Guid branchId);
        Task<Stylist> GetRandomStylistByBranchId(Guid branchId);
        Task<List<Stylist>> GetStylistByStaffStylist(Guid staffStylistId);
    }
}
