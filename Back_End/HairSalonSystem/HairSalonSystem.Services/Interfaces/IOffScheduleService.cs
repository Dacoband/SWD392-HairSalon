using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Services.PayLoads.Requests.OffSchedule;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.Interfaces
{
    public interface IOffScheduleService
    {
        Task<ActionResult<OffSchedule>> CreateOffSchedule(CreateOffScheduleRequest request, HttpContext context);
        Task<ActionResult<List<OffSchedule>>> GetAllSchedule(OffScheduleQuery query, HttpContext context);
        Task<ActionResult<OffSchedule>> GetScheduleById(Guid id, HttpContext context);

        Task<ActionResult<OffSchedule>> DeleteSchedule(Guid id, HttpContext context);
    }
}
