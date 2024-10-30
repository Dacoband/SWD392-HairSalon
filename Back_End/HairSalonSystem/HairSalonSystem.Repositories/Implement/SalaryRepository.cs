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
    public class SalaryRepository : ISalaryRepository
    {
        private readonly ISalaryDAO _salaryDAO;
        public SalaryRepository(ISalaryDAO salaryDAO) { 
         
            _salaryDAO = salaryDAO;
        }
        public async Task CreateSalary(Salary salary)
        {
           await _salaryDAO.CreateSalary(salary);
        }

        public async Task DeleteSalary(Guid salaryId)
        {
            await _salaryDAO.DeleteSalary(salaryId);
        }

        public async Task<List<Salary>> GetAllSalary()
        {
          return await _salaryDAO.GetAllSalary();
        }

        public async Task<Salary> GetSalaryById(Guid salaryId)
        {
            return await _salaryDAO.GetSalaryById(salaryId);
        }

        public async Task UpdateSalary(Salary salary)
        {
            await _salaryDAO.UpdateSalary(salary);
        }
    }
}
