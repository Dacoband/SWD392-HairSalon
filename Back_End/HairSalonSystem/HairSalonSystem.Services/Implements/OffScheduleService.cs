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
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace HairSalonSystem.Services.Implements
{
    public class OffScheduleService : IOffScheduleService
    {
        private readonly IOffScheduleRepository _offScheduleRepo;
        private readonly IStylistRepository _stylistRepo;
        private readonly IAppointmentRepository _appointmentRepo;
        
        public OffScheduleService(IOffScheduleRepository offScheduleRepo, IStylistRepository stylistRepo, IAppointmentRepository appointmentRepo)
        {
            _offScheduleRepo = offScheduleRepo;
            _stylistRepo = stylistRepo;
            _appointmentRepo = appointmentRepo;

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
            if (existingStylist == null || existingStylist.DelFlg == false)
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
            var allAppointment = await _appointmentRepo.GetAllAppointment();
            var existingAppointment = allAppointment.AsQueryable().Where(x => x.StylistId == request.StylistId && x.StartTime >= OffTimeStart && x.EndTime <= OffTimeEnd && (x.Status == 1 || x.Status == 2)).ToList();  
            if(existingAppointment.Count >0)
            {
                return new ObjectResult(MessageConstant.OffScheduleMessage.ExistAppointment)
                {
                    StatusCode = StatusCodes.Status400BadRequest
                };
            }
            //check duplicate Slot
            var existingSlot = await _offScheduleRepo.GetAll();
            var requestOffSlot =(int) request.OffSlot;
            existingSlot = existingSlot.AsQueryable().Where(x => x.StylistId == request.StylistId && requestOffSlot == x.OffSlot  && DateOnly.FromDateTime(x.OffDate) == DateOnly.FromDateTime(request.OffDate) && x.DelFlg == true ).ToList();
            if(existingSlot.Count >0)
            {
                return new ObjectResult("Bạn đã có lịch nghỉ vào slot này")
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
            //check stylist off
            var stylistOffSchedule = await _offScheduleRepo.GetAll();
            var requestStylist = await _stylistRepo.GetStylistById(request.StylistId);

            var stylistList = await _stylistRepo.GetStylistByBranchId(requestStylist.BranchID);
            var stylistListIds = stylistList.Select(x => x.StylistId).ToList();
            stylistOffSchedule = stylistOffSchedule
    .Where(x => x.OffDate.Date == request.OffDate.Date
                && (int)x.OffSlot == (int)request.OffSlot
                && stylistListIds.Contains(x.StylistId))
    .ToList();
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

        public async Task<ActionResult<OffSchedule>> DeleteSchedule(Guid id, HttpContext context)
        {
            var roleName = UserUtil.GetRoleName(context);
            if (roleName != "SL")
            {
                return new ObjectResult(MessageConstant.OffScheduleMessage.CreateRight)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }

           var existingOffSchedule = _offScheduleRepo.GetByOffScheduleId(id);
            if (existingOffSchedule == null)
            {
                return new ObjectResult(MessageConstant.OffScheduleMessage.NotFound)
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }

            try
            {
                await _offScheduleRepo.DeleteOffSchedule(id);
                return new ObjectResult(MessageConstant.OffScheduleMessage.DeleteSuccess)
                {
                    StatusCode = StatusCodes.Status200OK,

                };
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex)
                {
                    StatusCode = StatusCodes.Status500InternalServerError
                    
                };
            }
        }

        public async Task<ActionResult<List<OffSchedule>>> GetAllSchedule(OffScheduleQuery query, HttpContext context)
        {
            var accountID = UserUtil.GetAccountId(context);
            if (accountID == null)
            {
                return new ObjectResult(MessageConstant.OffScheduleMessage.NotRight)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }
            var existingOffSchedule = await _offScheduleRepo.GetAll();
            if (query.BranchId.HasValue)
            {
                var stylistOfBranch = await _stylistRepo.GetStylistByBranchId((Guid)query.BranchId);
                var stylistIds = stylistOfBranch.Select(s => s.StylistId).ToList();

                existingOffSchedule = existingOffSchedule.AsQueryable().Where(x => stylistIds.Contains(x.StylistId)).ToList();
            }
            if(query.StylistId.HasValue)
            {
                existingOffSchedule = existingOffSchedule.AsQueryable().Where(x => x.StylistId == query.StylistId).ToList();
            }
           
            if(query.GetBy == 1)
            {
                DateTime date = query.StartTime;
                int diffStart = (7 + (date.DayOfWeek - DayOfWeek.Monday)) % 7;
                DateTime firstDayOfWeek = date.AddDays(-1 * diffStart).Date;

                int diffEnd = (7 - (int)date.DayOfWeek + (int)DayOfWeek.Sunday) % 7;
                DateTime lastDayOfWeek = date.AddDays(diffEnd).Date;

                existingOffSchedule = existingOffSchedule.AsQueryable().Where(x => x.OffDate >= firstDayOfWeek && x.OffDate <= lastDayOfWeek).ToList();
            }

            if(query.GetBy == 2)
            {
                DateTime startMonth = new DateTime(query.StartTime.Year, query.StartTime.Month, 1);
                DateTime endMonth = new DateTime(query.StartTime.Year, query.StartTime.Month, DateTime.DaysInMonth(query.StartTime.Year, query.StartTime.Month));

                existingOffSchedule = existingOffSchedule.AsQueryable().Where(x => x.OffDate>=startMonth && x.OffDate <= endMonth).ToList();    
            }
            existingOffSchedule = existingOffSchedule.AsQueryable().Where(x => x.DelFlg == query.DelFlg).OrderBy(x => x.OffDate).ToList();
            if(existingOffSchedule.Count == 0)
            {
                return new ObjectResult(MessageConstant.OffScheduleMessage.NotFound)
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }

            return new OkObjectResult(existingOffSchedule);


        }

        public async Task<ActionResult<OffSchedule>> GetScheduleById(Guid id, HttpContext context)
        {
            var accountID = UserUtil.GetAccountId(context);
            if (accountID == null)
            {
                return new ObjectResult(MessageConstant.OffScheduleMessage.NotRight)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }

            var result =await _offScheduleRepo.GetByOffScheduleId(id);
            if (result == null)
            {
                return new ObjectResult(MessageConstant.OffScheduleMessage.NotFound)
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }

            return new OkObjectResult(result);
        }
    }
}
