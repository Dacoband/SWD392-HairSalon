using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Interface;
using HairSalonSystem.Services.Constant;
using HairSalonSystem.Services.Enums;
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
        private readonly IAppointmentRepository _appointmentRepo;
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
            //check appointment
          
            var OffTimeStart = new DateTime(request.OffDate.Year, request.OffDate.Month, request.OffDate.Day);
            var OffTimeEnd = new DateTime(request.OffDate.Year, request.OffDate.Month, request.OffDate.Day);
            if (request.OffSlot == SlotEnum.am) {
               OffTimeStart = OffTimeStart.AddHours(8);
               OffTimeEnd = OffTimeEnd.AddHours(12);
            }
            else
            {
                OffTimeStart = OffTimeStart.AddHours(12);
                OffTimeEnd = OffTimeEnd.AddHours(17);
            }
            var existingAppointment = await _appointmentRepo.GetAllAppointment();
            existingAppointment = existingAppointment.AsQueryable().Where(x => x.StylistId == request.StylistId && x.StartTime >= OffTimeStart && x.EndTime <= OffTimeEnd && (x.Status == 1 || x.Status == 2)).ToList();  
            if(existingAppointment != null)
            {
                return new ObjectResult(MessageConstant.OffScheduleMessage.ExistAppointment)
                {
                    StatusCode = StatusCodes.Status400BadRequest
                };
            }
            //check create time
            if(DateOnly.FromDateTime(request.OffDate) <= DateOnly.FromDateTime(DateTime.Now.AddDays(5)))
                {
                return new ObjectResult(MessageConstant.OffScheduleMessage.InvalidTime)
                {
                    StatusCode = StatusCodes.Status400BadRequest
                };
            }

            //check date(8slot/month)
            var existingOffSchedule = await _offScheduleRepo.GetOffScheduleInMonth(request.StylistId, request.OffDate);
            if(existingOffSchedule.Count >= 8)
            {
                return new ObjectResult(MessageConstant.OffScheduleMessage.MaxSlot)
                {
                    StatusCode = StatusCodes.Status400BadRequest
                };
            }

            //create offSchedule
            OffSchedule model = new OffSchedule()
            {
                OffScheduleId = new Guid(),
                StylistId = request.StylistId,
                OffDate = request.OffDate,
                OffSlot = (int)request.OffSlot,
                DelFlg = true
            };
            try
            {
                await _offScheduleRepo.CreateSchedule(model);
                return new ObjectResult(MessageConstant.OffScheduleMessage.CreateSuccess)
                {
                    StatusCode = StatusCodes.Status201Created,
                    Value = model
                };

            }catch (Exception ex) {
                return new ObjectResult(MessageConstant.OffScheduleMessage.CreateFail)
                {
                    StatusCode = StatusCodes.Status500InternalServerError

                };
            }
        }
    }
}
