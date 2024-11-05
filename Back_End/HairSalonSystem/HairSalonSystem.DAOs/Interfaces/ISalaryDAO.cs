using HairSalonSystem.BusinessObject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.DAOs.Interfaces
{
    public interface ISalaryDAO
    {
        Task CreateSalary(Salary salary);
        Task UpdateSalary(Salary salary);
        Task DeleteSalary(Guid salaryId);
        Task<Salary> GetSalaryById(Guid salaryId);
        Task<List<Salary>> GetAllSalary();
    }
}
