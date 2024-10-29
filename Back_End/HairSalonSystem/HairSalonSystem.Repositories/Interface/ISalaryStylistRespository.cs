using HairSalonSystem.BusinessObject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Repositories.Interface
{
    public interface ISalaryStylistRespository
    {
        Task<SalaryStylist> GetSalaryStylistById(Guid stylistId);
        Task<List<SalaryStylist>> GetAllSalaryStylists();
        Task AddSalaryStylist(SalaryStylist salaryStylist);
        Task UpdateSalaryStylist(SalaryStylist salaryStylist);
        Task RemoveSalaryStylist(Guid salaryStylistID);

    }
}
