using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Interface;
using HairSalonSystem.Services.Constant;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.PayLoads.Requests.Cancellation;
using HairSalonSystem.Services.Util;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static HairSalonSystem.Services.Constant.APIEndPointConstant;

namespace HairSalonSystem.Services.Implements
{
    public class AppointmentCancellationService : IAppointmentCacellationService
    {
        private readonly IAppointmentCancellationRepository _cancellationRepo;
        private readonly IAppointmentRepository _appointmentRepo;
        public AppointmentCancellationService(IAppointmentCancellationRepository cancellationRepo, IAppointmentRepository appointmentRepo)
        {
            _cancellationRepo = cancellationRepo;
            _appointmentRepo = appointmentRepo;
        }
        public async Task<ActionResult<AppointmentCancellation>> CreateCancellation(CreateCancellationReq req, HttpContext context)
        {
            var accountID = UserUtil.GetAccountId(context);
            if (accountID == null)
            {
                return new ObjectResult(MessageConstant.CancelAppointmentMessage.CreateRight)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }

            var roleName = UserUtil.GetRoleName(context);
            if (roleName != "MB" && roleName !="SL" && roleName != "ST" )
            {
                return new ObjectResult(MessageConstant.CancelAppointmentMessage.CreateRight)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }

            var existAppointment = await _appointmentRepo.GetAppointmentById(req.AppointmetId);
            if (existAppointment == null) {
                return new ObjectResult(MessageConstant.AppointmentMessage.NotFound)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }

            if(existAppointment.CustomerId != accountID && existAppointment.StylistId != accountID && roleName != "SL") {

                return new ObjectResult(MessageConstant.CancelAppointmentMessage.CreateRight)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }

            AppointmentCancellation model = new AppointmentCancellation()
            {
                CancellationId = new Guid(),
                AppointmentId = req.AppointmetId,
                Reason = req.Reason,
                InsDate = TimeUtils.GetCurrentSEATime(),
                UpdDate = TimeUtils.GetCurrentSEATime(),
                DelFlg = true

            };
            var status = existAppointment.Status;
            if(roleName == "MB")
            {
                status = 2;

            }
            else
            {
                //chưa tặng voucher cho cus nếu salon hủy apopointment
                status = 3;
            }
            try
            {

                await _appointmentRepo.UpdateAppointmentStatus(existAppointment.AppointmentId, status);
                await _cancellationRepo.CreateCancellation(model);
                return new ObjectResult(MessageConstant.CancelAppointmentMessage.CreateSuccess)
                {
                    StatusCode = StatusCodes.Status201Created,
                    Value = model
                };
            }
            catch (Exception ex)
            {
                return new ObjectResult(MessageConstant.CancelAppointmentMessage.Exception)
                {
                    StatusCode = StatusCodes.Status500InternalServerError,
                    Value = ex.Message
                };
            }
        }

        public Task<ActionResult<List<AppointmentCancellation>>> GetAll(HttpContext context)
        {
            throw new NotImplementedException();
        }

        public Task<ActionResult<AppointmentCancellation>> GetByAppointment(Guid appointmentId, HttpContext context)
        {
            throw new NotImplementedException();
        }

        public Task<ActionResult<AppointmentCancellation>> GetById(Guid cancellatonId, HttpContext context)
        {
            throw new NotImplementedException();
        }
    }
}
