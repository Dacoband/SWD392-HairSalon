using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.DAOs.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Repositories.Implement
{
    public class SalaryStylistRespository
    {
        private readonly ISalaryStylistDAO _salaryStylistDAO;

        public SalaryStylistRespository(ISalaryStylistDAO salaryStylistDAO)
        {
            _salaryStylistDAO = salaryStylistDAO;
        }

        public async Task<SalaryStylist> GetSalaryStylistById(Guid stylistId)
        {
            return await _salaryStylistDAO.GetSalaryByStylistIDAsync(stylistId);
        }

        public async Task<List< SalaryStylist>> GetAllSalaryStylists()
        {
            return await _salaryStylistDAO.GetAllSalaryStylistAsync();
        }

        public async Task AddSalaryStylist(SalaryStylist salaryStylist)
        {
            await _salaryStylistDAO.CreateSalaryStylistAsync(salaryStylist);
        }

        public async Task UpdateSalaryStylist(SalaryStylist  salaryStylist)
        {
            await _salaryStylistDAO.UpdateSalaryStylistAsync(salaryStylist);
        }

        public async Task RemoveSalaryStylist(Guid salaryStylistID)
        {
            await _salaryStylistDAO.DeleteSalaryStylistAsync(salaryStylistID);
        }
    }
}
