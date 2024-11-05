using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Services.Constant;
using HairSalonSystem.Services.Controllers;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.PayLoads.Requests.Appointment;
using HairSalonSystem.Services.PayLoads.Requests.Salary;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HairSalonSystem.API.Controllers
{

    [ApiController]
    public class SalaryController : BaseController<SalaryController>
    {
        private readonly ISalaryService _salaryService;

        public SalaryController(ILogger<SalaryController> logger, ISalaryService salaryService) : base(logger)
        {
            _salaryService = salaryService;
        }

        [HttpPost]
        [Route(APIEndPointConstant.Salary.CreateSalary)]
        [ProducesResponseType(typeof(List<Salary>), StatusCodes.Status201Created)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        public async Task<ActionResult<List<Salary>>> CreateSalary()
        {
            var result = await _salaryService.CreateSalary();
            return result;
        }
        [HttpGet]
        [Route(APIEndPointConstant.Salary.GetSalaryById)]
        [ProducesResponseType(typeof(Salary), StatusCodes.Status201Created)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        [Authorize(Roles = "SA,SM")]
        public async Task<ActionResult<Salary>> GetSalaryById(Guid id)
        {
            return await _salaryService.GetSalaryById(id, HttpContext);
        }

        [HttpGet]
        [Route(APIEndPointConstant.Salary.GetAllSalary)]
        [ProducesResponseType(typeof(List<Salary>), StatusCodes.Status201Created)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        [Authorize(Roles = "SA,SM,ST")]
        public async Task<ActionResult<List<Salary>>> GetSalary([FromQuery]QuerySalary query)
        {
            return await _salaryService.GetAllSalary(query, HttpContext);
        }
    }
}
