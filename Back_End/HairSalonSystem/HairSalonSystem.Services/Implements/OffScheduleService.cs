using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Interface;
using HairSalonSystem.Services.Constant;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.PayLoads.Requests.OffSchedule;
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
    public class OffScheduleService : IOffScheduleService
    {
        private readonly IOffScheduleRepository _offScheduleRepo;
        private readonly IStylistRepository _stylistRepo;
        public OffScheduleService(IOffScheduleRepository offScheduleRepo, IStylistRepository stylistRepo)
        {
            _offScheduleRepo = offScheduleRepo;
            _stylistRepo = stylistRepo;

        }

        public async Task<ActionResult<OffSchedule>> CreateOffSchedule(CreateOffScheduleRequest request, HttpContext context)
        {
            //check role
            var roleName = UserUtil.GetRoleName(context);
            if (roleName != "SL")
            {
                return new ObjectResult(MessageConstant.OffScheduleMessage.CreateRight)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }
            //check stylist
            var existingStylist = await _stylistRepo.GetStylistById(request.StylistId);
            if (existingStylist == null)
            {
                return new ObjectResult(MessageConstant.StylistMessage.StylistNotFound)
                {
                    StatusCode = StatusCodes.Status404NotFound
                };

            }
            //check date(8slot/month)


        }
    }
}
