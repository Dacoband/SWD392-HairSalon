using Amazon.Runtime.Internal.Util;
using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Interface;
using HairSalonSystem.Services.Constant;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.PayLoads.Requests.Appointment;
using HairSalonSystem.Services.PayLoads.Responses.Service;
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
    public class AppointmentService : IAppointmentService
    {
        private readonly IAppointmentRepository _appointmentRepository;
        private readonly IStylistRepository _stylistRepository;
        private readonly IServiceRepository _serviceRepository;
        private readonly IBranchRespository _branchRepository;
        
        public AppointmentService(IAppointmentRepository appointmentRepository, IStylistRepository stylistRepository, IServiceRepository serviceRepository) 
        {
            _appointmentRepository = appointmentRepository;
            _stylistRepository = stylistRepository;
            _serviceRepository = serviceRepository;

        }
        public async Task<ActionResult<BusinessObject.Entities.Appointment>> CreateAppointment(CreateAppointmentRequest request, HttpContext context)
        {
            var accountID = UserUtil.GetAccountId(context);
            if (accountID == null)
            {
                return new ObjectResult(MessageConstant.AppointmentMessage.CreateRight)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }

            var roleName = UserUtil.GetRoleName(context);
            if (roleName != "MB")
            {
                return new ObjectResult(MessageConstant.AppointmentMessage.CreateRight)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }
            //initiate
            List<BusinessObject.Entities.Appointment> appointments = await _appointmentRepository.GetAllAppointment();
            List<BusinessObject.Entities.AppointmentService> appointmentdetail = new List<BusinessObject.Entities.AppointmentService>();
            BusinessObject.Entities.Appointment appointment = new BusinessObject.Entities.Appointment();
            appointment.AppointmentId = new Guid();
            appointment.TotalPrice = 0;
            appointment.CustomerId = (Guid)accountID;
            appointment.Status = 1;
            appointment.InsDate = TimeUtils.GetCurrentSEATime();
            appointment.UpDate = TimeUtils.GetCurrentSEATime();
            int duration = 0;
            //Validate stylist
            var existStylist = await _stylistRepository.GetStylistById(request.StylistId);
            if (existStylist == null)
            {
                return new ObjectResult(MessageConstant.StylistMessage.StylistNotFound)
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }
            appointment.StylistId = existStylist.StylistId;
            //validate Service
            foreach (var i in request.ServiceIds)
            {
                var existService = await _serviceRepository.GetServiceById(i);
                if (existService == null)
                {
                    return new ObjectResult("Service" + i + "not found")
                    {
                        StatusCode = StatusCodes.Status404NotFound
                    };
                }
                else
                {
                    //Cretae AppointmentService
                    BusinessObject.Entities.AppointmentService appointmentService = new BusinessObject.Entities.AppointmentService()
                    {
                        AppointmentId = appointment.AppointmentId,
                        ServiceId = i,
                        UnitPrice = existService.Price,
                    };
                    appointment.TotalPrice += appointmentService.UnitPrice;
                    appointmentdetail.Add(appointmentService);
                    duration += existService.Duration;
                }
            }
            appointment.AppointmentService = appointmentdetail;
            appointment.StartTime = request.AppointmentDate;
            appointment.EndTime = request.AppointmentDate.AddHours(duration);
            //Validate Date
            if(request.AppointmentDate.Hour.CompareTo(8) < 0 || request.AppointmentDate.Hour.CompareTo(20) > 0)
            {
                return new ObjectResult(MessageConstant.AppointmentMessage.NotOpen)
                {
                    StatusCode = StatusCodes.Status400BadRequest
                };
            }
            var stylistAppointment = appointments.Where(x => x.StylistId == request.StylistId).ToList();
            var checkAppointment = stylistAppointment.Where(c => appointment.StartTime <= c.EndTime && appointment.EndTime >= c.StartTime && c.Status == 2).FirstOrDefault();
            if(checkAppointment != null)
            {
                return new ObjectResult(MessageConstant.AppointmentMessage.NotAvailable)
                {
                    StatusCode = StatusCodes.Status400BadRequest
                };
            }
            try {


                await _appointmentRepository.CreateAppointment(appointment);
                return new ObjectResult(MessageConstant.AppointmentMessage.CreateSuccess)
                {
                    StatusCode = StatusCodes.Status201Created,
                    Value = appointment
                };
            }catch (Exception ex)
            {
                return new ObjectResult(MessageConstant.AppointmentMessage.Exception)
                {
                    StatusCode = StatusCodes.Status500InternalServerError,
                };
            }
           
        }

        public async Task<ActionResult<BusinessObject.Entities.Appointment>> GetAppointmentById(Guid id, HttpContext context)
        {
            var accountID = UserUtil.GetAccountId(context);
            if (accountID == null)
            {
                return new ObjectResult(MessageConstant.AppointmentMessage.NotRight)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }

            var result = await _appointmentRepository.GetAppointmentById(id);
            if(result == null)
            {
                return new ObjectResult(MessageConstant.AppointmentMessage.NotFound)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }
            return new OkObjectResult(result);
        }

        public async Task<ActionResult<List<BusinessObject.Entities.Appointment>>> GetAppointmentList(QueryAppointment query, HttpContext context)
        {
            var accountID = UserUtil.GetAccountId(context);
            if (accountID == null)
            {
                return new ObjectResult(MessageConstant.AppointmentMessage.NotRight)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }
            var appointmentList = await _appointmentRepository.GetAllAppointment();
            
            if(query.BranchId != null)
            {
                
                var stylistList = await _stylistRepository.GetStylistByBranchId((Guid)query.BranchId);
                var stylistIds = stylistList.Select(stylist => stylist.StylistId).ToList();
                appointmentList = appointmentList.Where(x => stylistIds.Contains(x.StylistId)).ToList();
    
            }
            if(query.CustomerId != null)
            {
                appointmentList.AsQueryable().Where(x => x.CustomerId == query.CustomerId).ToList();
            }
            if(query.StylistId != null)
            {
                appointmentList.AsQueryable().Where(x => x.StylistId == query.StylistId).ToList();
            }
            if(query.Status != null)
            {
                appointmentList = appointmentList.AsQueryable().Where(x => x.Status == query.Status).ToList();
            }
            if(query.StartTime.HasValue)
            {
                appointmentList = appointmentList.AsQueryable().Where(x => x.StartTime >= query.StartTime).ToList();
            }
            if(query.EndTime.HasValue)
            {
                appointmentList = appointmentList.AsQueryable().Where(x => x.EndTime <= query.EndTime).ToList();
            }
            if (query.pageIndex.HasValue && query.pageSize.HasValue)
            {
                int validPageIndex = query.pageIndex.Value > 0 ? query.pageIndex.Value - 1 : 0;
                int validPageSize = query.pageSize.Value > 0 ? query.pageSize.Value : 10;

                appointmentList = appointmentList.Skip(validPageIndex * validPageSize).Take(validPageSize).ToList();
            }
            if (appointmentList.Count == 0)
            {
                return new ObjectResult(MessageConstant.AppointmentMessage.NotFound)
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }
            
            return new OkObjectResult(appointmentList);


        }

        public async Task<ActionResult> UpdateAppointmentStatus(Guid appointmentId, int status, HttpContext context)
        {
            var accountID = UserUtil.GetAccountId(context);
            if (accountID == null)
            {
                return new ObjectResult(MessageConstant.AppointmentMessage.UpdateRight)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }

            var roleName = UserUtil.GetRoleName(context);
            var appointment = await _appointmentRepository.GetAppointmentById(appointmentId);

            if (accountID != appointment.StylistId && accountID != appointment.CustomerId && roleName != "SL")
            {
                return new ObjectResult(MessageConstant.AppointmentMessage.UpdateRight)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }
            if(appointment == null)
            {

                return new ObjectResult(MessageConstant.AppointmentMessage.NotFound)
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }
            if(status != 1 && status != 2 && status != 3 && status !=4 && status != 5)
            {
                return new ObjectResult(MessageConstant.AppointmentMessage.InvalidStatus)
                {
                    StatusCode = StatusCodes.Status400BadRequest
                };
            }
            try
            {
                appointment.Status = status;
                appointment.UpDate = TimeUtils.GetCurrentSEATime();
                await _appointmentRepository.UpdateAppointment(appointment);
                return new ObjectResult(MessageConstant.AppointmentMessage.UpdateSuccess)
                {
                    StatusCode = StatusCodes.Status201Created,
                    Value = appointment
                };
            }
            catch (Exception ex)
            {
                return new ObjectResult(MessageConstant.AppointmentMessage.Exception)
                {
                    StatusCode = StatusCodes.Status500InternalServerError,
                };
            }



        }
    }
}
