using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Implement;
using HairSalonSystem.Repositories.Interface;
using HairSalonSystem.Services.Constant;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.PayLoads.Requests.Appointment;
using HairSalonSystem.Services.PayLoads.Requests.Salary;
using HairSalonSystem.Services.Util;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.Implements
{
    public class SalaryService : ISalaryService
    {
        private readonly ISalaryRepository _salaryRepo;
        private readonly IAppointmentService _appointmentService;
        private readonly IStylistRepository _stylistRepo;
        public SalaryService(ISalaryRepository salaryRepo, IAppointmentService appointmentService,IStylistRepository stylistRepo)
        {
            _salaryRepo = salaryRepo;
            _appointmentService = appointmentService;
            _stylistRepo = stylistRepo;

        }
        public async Task<ActionResult<List<Salary>>> CreateSalary()
        {
            List<Salary> res = new List<Salary>();
            List<Stylist> stylistList = await _stylistRepo.GetAllStylist();
            stylistList = stylistList.Where(x => x.DelFlg == true).ToList();
            DateTime lastDayOfMonth = new DateTime(DateTime.Today.Year, DateTime.Today.Month, DateTime.DaysInMonth(DateTime.Today.Year, DateTime.Today.Month)).ToLocalTime();

            foreach (var stylist in stylistList)
            {
                var existingSalary = await _salaryRepo.GetAllSalary();
                existingSalary = existingSalary.Where(x => x.StylistId == stylist.StylistId && x.InsDate.Month == DateTime.Today.Month).ToList();
                if (existingSalary.Count ==0)
                {
                    var salary = new Salary()
                    {
                        SalaryId = new Guid(),
                        StylistId = stylist.StylistId,
                        BaseSalary = 5000000,
                        CommissionPercentage = 0,
                        PaymentDate = lastDayOfMonth,
                        InsDate = DateTime.Now,
                        UpdDate = DateTime.Now,
                        DelFlg = true,
                    };
                    salary.TotalSalary = salary.BaseSalary + salary.CommissionPercentage;
                    await _salaryRepo.CreateSalary(salary); 
                    res.Add(salary);
                }

            }
            return new OkObjectResult(res);
        }

        public async Task<ActionResult<List<Salary>>> GetAllSalary(QuerySalary query, HttpContext context)
        {
            var accountID = UserUtil.GetAccountId(context);
            if (accountID == null)
            {
                return new ObjectResult(MessageConstant.SalaryMessage.NotRight)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }
            var roleName = UserUtil.GetRoleName(context);
            if (roleName != "SA" && roleName != "SM" && roleName != "ST")
            {

                return new ObjectResult(MessageConstant.SalaryMessage.NotRight)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }

            if (roleName == "ST")
            {
                query.StylistId = accountID;
            }
            var salaryList = await _salaryRepo.GetAllSalary();
            if(query.StylistId.HasValue)
            {
                salaryList = salaryList.AsQueryable().Where(x => x.StylistId == query.StylistId).ToList();
            }
            if (query.BaseSalary.HasValue)
            {
                salaryList = salaryList.AsQueryable().Where(x => x.BaseSalary >=  query.BaseSalary).ToList();

            }
            if(query.CommissionPercentage.HasValue)
            {
                salaryList = salaryList.AsQueryable().Where(x => x.CommissionPercentage >= query.CommissionPercentage).ToList();
            }
            if (query.PaymentDate.HasValue)
            {
                salaryList = salaryList.AsQueryable().Where(x => x.PaymentDate.Month == query.PaymentDate.Value.Month && x.PaymentDate.Year == query.PaymentDate.Value.Year).ToList();
            }
            if (query.DelFlg.HasValue)
            {
                salaryList = salaryList.AsQueryable().Where(x => x.DelFlg == query.DelFlg).ToList();
            }

            if (query.pageIndex.HasValue && query.pageSize.HasValue)
            {
                int validPageIndex = query.pageIndex.Value > 0 ? query.pageIndex.Value - 1 : 0;
                int validPageSize = query.pageSize.Value > 0 ? query.pageSize.Value : 10;

                salaryList = salaryList.Skip(validPageIndex * validPageSize).Take(validPageSize).ToList();
            }

            if (!salaryList.Any())
            {
                return new ObjectResult(MessageConstant.AppointmentMessage.NotFound)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }
            return new OkObjectResult(salaryList);
        }

        public async Task<ActionResult<Salary>> GetSalaryById(Guid id, HttpContext context)
        {
            var accountID = UserUtil.GetAccountId(context);
            if (accountID == null)
            {
                return new ObjectResult(MessageConstant.SalaryMessage.NotRight)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }

            var roleName = UserUtil.GetRoleName(context);
            if (roleName != "SA" && roleName != "SM")       
            {
                return new ObjectResult(MessageConstant.SalaryMessage.NotRight)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }

            var salary =await _salaryRepo.GetSalaryById(id);
            if(salary == null) {
                return new ObjectResult(MessageConstant.SalaryMessage.NotFound)
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }

            return new OkObjectResult(salary);
        }
    }
}
