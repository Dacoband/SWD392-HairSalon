using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Services.PayLoads.Requests.Salary;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.Interfaces
{
    public interface ISalaryService
    {
        Task<ActionResult<List<Salary>>> CreateSalary();
        Task<ActionResult<List<Salary>>> GetAllSalary(QuerySalary query, HttpContext context);
        Task<ActionResult<Salary>> GetSalaryById(Guid id, HttpContext context);
        
    }
}
