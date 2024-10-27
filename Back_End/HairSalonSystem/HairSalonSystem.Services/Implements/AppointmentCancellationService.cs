using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Interface;
using HairSalonSystem.Services.Constant;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.PayLoads.Requests.Cancellation;
using HairSalonSystem.Services.PayLoads.Responses.Cancellation;
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
            if(existAppointment.Status == 5)
            {
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
                status = 3;

            }
            else
            {
                //chưa tặng voucher cho cus nếu salon hủy apopointment
                status = 4;
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

        public async Task<ActionResult<List<CancellationResponse>>> GetAll(HttpContext context, Pagination query)
        {
            var accountID = UserUtil.GetAccountId(context);
            if (accountID == null)
            {
                return new ObjectResult(MessageConstant.CancelAppointmentMessage.GetRight)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }

            var roleName = UserUtil.GetRoleName(context);
            if (roleName != "SA" && roleName != "SM")
            {
                return new ObjectResult(MessageConstant.CancelAppointmentMessage.GetRight)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }
            var  cancelationList  = await _cancellationRepo.GetAll();
            var cancelResponse = new List<CancellationResponse>();
            if (cancelationList == null ||  cancelationList.Count == 0)
            {
                return new ObjectResult(MessageConstant.AppointmentMessage.NotFound)
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }

            foreach (AppointmentCancellation cancellation in cancelationList)
            {
                var appointment = await _appointmentRepo.GetAppointmentById(cancellation.AppointmentId);
                CancellationResponse res = new CancellationResponse()
                {
                    CancellationId = cancellation.CancellationId,
                    Reason = cancellation.Reason,
                    InsDate = cancellation.InsDate,
                    UpdDate = cancellation.UpdDate,
                    DelFlg = cancellation.DelFlg,
                    appointment = appointment
                };
                cancelResponse.Add(res);
            }

            if (query.pageIndex.HasValue && query.pageSize.HasValue)
            {
                int validPageIndex = query.pageIndex.Value > 0 ? query.pageIndex.Value - 1 : 0;
                int validPageSize = query.pageSize.Value > 0 ? query.pageSize.Value : 10;

                cancelResponse = cancelResponse.Skip(validPageIndex * validPageSize).Take(validPageSize).ToList();
            }
            return new OkObjectResult(cancelResponse);
        }

        public async Task<ActionResult<CancellationResponse>> GetByAppointment(Guid appointmentId, HttpContext context)
        {
            var accountID = UserUtil.GetAccountId(context);
            var roleName = UserUtil.GetRoleName(context);
            var appointment = await _appointmentRepo.GetAppointmentById(appointmentId);

            //if (accountID == null)
            //{
            //    return new ObjectResult(MessageConstant.CancelAppointmentMessage.GetRight)
            //    {
            //        StatusCode = StatusCodes.Status403Forbidden
            //    };
            //}
          
           
            //if(appointment == null)
            //{
            //    return new ObjectResult(MessageConstant.AppointmentMessage.NotFound)
            //    {
            //        StatusCode = StatusCodes.Status404NotFound
            //    };
            //}

            //if (roleName != "SA" && roleName != "SM" && appointment.CustomerId != accountID && appointment.StylistId != accountID )
            //{
            //    return new ObjectResult(MessageConstant.CancelAppointmentMessage.GetRight)
            //    {
            //        StatusCode = StatusCodes.Status403Forbidden
            //    };
            //}

            var cancellation = await _cancellationRepo.GetByAppointmentId(appointmentId);

            if(cancellation == null)
            {
                return new ObjectResult(MessageConstant.AppointmentMessage.NotFound)
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }
        
            var res = new CancellationResponse()
            {
                CancellationId = cancellation.CancellationId,
                Reason = cancellation.Reason,
                InsDate = cancellation.InsDate,
                UpdDate = cancellation.UpdDate,
                DelFlg = cancellation.DelFlg,
                appointment = appointment,
            };

            return new OkObjectResult(res);


        }

        public async Task<ActionResult<CancellationResponse>> GetById(Guid cancellatonId, HttpContext context)
        {
            var accountID = UserUtil.GetAccountId(context);
            var roleName = UserUtil.GetRoleName(context);
            var cancellation = await  _cancellationRepo.GetByCancellationId(cancellatonId);
            var appointment = await _appointmentRepo.GetAppointmentById(cancellation.AppointmentId);

            //if (accountID == null)
            //{
            //    return new ObjectResult(MessageConstant.CancelAppointmentMessage.GetRight)
            //    {
            //        StatusCode = StatusCodes.Status403Forbidden
            //    };
            //}


            //if (appointment == null)
            //{
            //    return new ObjectResult(MessageConstant.AppointmentMessage.NotFound)
            //    {
            //        StatusCode = StatusCodes.Status404NotFound
            //    };
            //}

            //if (roleName != "SA" && roleName != "SM" && appointment.CustomerId != accountID && appointment.StylistId != accountID)
            //{
            //    return new ObjectResult(MessageConstant.CancelAppointmentMessage.GetRight)
            //    {
            //        StatusCode = StatusCodes.Status403Forbidden
            //    };
            //}


            if (cancellation == null)
            {
                return new ObjectResult(MessageConstant.AppointmentMessage.NotFound)
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }

            var res = new CancellationResponse()
            {
                CancellationId = cancellation.CancellationId,
                Reason = cancellation.Reason,
                InsDate = cancellation.InsDate,
                UpdDate = cancellation.UpdDate,
                DelFlg = cancellation.DelFlg,
                appointment = appointment,
            };

            return new OkObjectResult(res);
        }
    }
}
