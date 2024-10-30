using Amazon.Runtime.Internal;
using Amazon.Runtime.Internal.Util;
using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Interface;
using HairSalonSystem.Services.Constant;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.PayLoads.Requests.Appointment;
using HairSalonSystem.Services.PayLoads.Responses.Appointment;
using HairSalonSystem.Services.PayLoads.Responses.Service;
using HairSalonSystem.Services.Util;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.Implements
{
    public class AppointmentService : IAppointmentService
    {
        private readonly IAppointmentRepository _appointmentRepository;
        private readonly IStylistRepository _stylistRepository;
        private readonly IServiceRepository _serviceRepository;
        private readonly IBranchRespository _branchRepository;
        private readonly IAppointmentServiceRepository _appointmentServiceRepository;
        private readonly IMongoClient _mongoClient;

        public AppointmentService(IAppointmentRepository appointmentRepository, IStylistRepository stylistRepository, IServiceRepository serviceRepository
, IAppointmentServiceRepository appointmentServiceRepository, IMongoClient mongoClient
)
        {
            _mongoClient = mongoClient; 
            _appointmentRepository = appointmentRepository;
            _stylistRepository = stylistRepository;
            _serviceRepository = serviceRepository;
            _appointmentServiceRepository = appointmentServiceRepository;

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
            List<BusinessObject.Entities.AppointmentService> appointmentDetails = new List<BusinessObject.Entities.AppointmentService>();
            BusinessObject.Entities.Appointment appointment = new BusinessObject.Entities.Appointment
            {
                AppointmentId = Guid.NewGuid(),
                TotalPrice = 0,
                CustomerId = (Guid)accountID,
                Status = 1,
                InsDate = TimeUtils.GetCurrentSEATime(),
                UpDate = TimeUtils.GetCurrentSEATime()
            };

            int duration = 0;
            //validate stylist
            var existStylist = await _stylistRepository.GetStylistById(request.StylistId);
            if (existStylist == null)
            {
                return new ObjectResult(MessageConstant.StylistMessage.StylistNotFound)
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }

            appointment.StylistId = existStylist.StylistId;
            //validate service
            foreach (var serviceId in request.ServiceIds)
            {
                var existService = await _serviceRepository.GetServiceById(serviceId);
                if (existService == null)
                {
                    return new ObjectResult("Service " + serviceId + " not found")
                    {
                        StatusCode = StatusCodes.Status404NotFound
                    };
                }

                var appointmentService = new BusinessObject.Entities.AppointmentService
                {
                    AppointmentId = appointment.AppointmentId,
                    ServiceId = serviceId,
                    UnitPrice = existService.Price,
                };

                appointment.TotalPrice += appointmentService.UnitPrice;
                appointmentDetails.Add(appointmentService);
                duration += existService.Duration;
            }

            appointment.StartTime = request.AppointmentDate;
            appointment.EndTime = request.AppointmentDate.AddMinutes(duration);

            //validate time
            if (request.AppointmentDate.Hour < 8 || request.AppointmentDate.Hour > 17)
            {
                return new ObjectResult(MessageConstant.AppointmentMessage.NotOpen)
                {
                    StatusCode = StatusCodes.Status400BadRequest
                };
            }
            if (request.AppointmentDate < DateTime.UtcNow.AddHours(1))
            {
                return new ObjectResult(MessageConstant.AppointmentMessage.InvalidTime)
                {
                    StatusCode = StatusCodes.Status400BadRequest
                };
            }

            var stylistAppointments = appointments.Where(x => x.StylistId == request.StylistId).ToList();
            var conflictingAppointment = stylistAppointments
                .FirstOrDefault(c => appointment.StartTime <= c.EndTime && appointment.EndTime >= c.StartTime && c.Status == 2);

            if (conflictingAppointment != null)
            {
                return new ObjectResult(MessageConstant.AppointmentMessage.NotAvailable)
                {
                    StatusCode = StatusCodes.Status400BadRequest
                };
            }
            //create appointment
            using var session = await _mongoClient.StartSessionAsync();
            session.StartTransaction();
            try
            {
                await _appointmentRepository.CreateAppointment(appointment, session);

                foreach (var appointmentService in appointmentDetails)
                {
                    await _appointmentServiceRepository.CreateAppointmentService(appointmentService, session);
                }

                await session.CommitTransactionAsync();

                return new ObjectResult(MessageConstant.AppointmentMessage.CreateSuccess)
                {
                    StatusCode = StatusCodes.Status201Created,
                    Value = appointment
                };
            }
            catch (Exception ex)
            {
                await session.AbortTransactionAsync();

                return new ObjectResult(MessageConstant.AppointmentMessage.Exception)
                {
                    StatusCode = StatusCodes.Status500InternalServerError,
                    Value = ex.Message
                };
            }
        }


        public async Task<ActionResult<AppointmentResponse>> GetAppointmentById(Guid id, HttpContext context)
        {
            var accountID = UserUtil.GetAccountId(context);
            if (accountID == null)
            {
                return new ObjectResult(MessageConstant.AppointmentMessage.NotRight)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }

            var appointment = await _appointmentRepository.GetAppointmentById(id);
            if(appointment == null)
            {
                return new ObjectResult(MessageConstant.AppointmentMessage.NotFound)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }
            var serviceappointment = await _appointmentServiceRepository.GetByAppointmentId(appointment.AppointmentId);
            var result = new AppointmentResponse
            {
                AppointmentId = appointment.AppointmentId,
                CustomerId = appointment.CustomerId,
                StylistId = appointment.StylistId,
                Status = appointment.Status,
                TotalPrice = appointment.TotalPrice,
                InsDate = appointment.InsDate,
                UpDate = appointment.UpDate,
                StartTime = appointment.StartTime,
                EndTime = appointment.EndTime,
                SevicesList = serviceappointment
            };

           
            return new OkObjectResult(result);
        }

        public async Task<ActionResult<List<AppointmentResponse>>> GetAppointmentList(QueryAppointment query, HttpContext context)
        {

            var accountID = UserUtil.GetAccountId(context);
            if (accountID == null)
            {
                return new ObjectResult(MessageConstant.AppointmentMessage.NotFound)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }

            // Fetch all appointments from the repository
            var appointmentList = await _appointmentRepository.GetAllAppointment();

            // Apply filters based on query parameters
            if (query.BranchId != null)
            {
                var stylistList = await _stylistRepository.GetStylistByBranchId((Guid)query.BranchId);
                var stylistIds = stylistList.Select(stylist => stylist.StylistId).ToList();
                appointmentList = appointmentList.Where(x => stylistIds.Contains(x.StylistId)).ToList();
            }

            if (query.CustomerId != null)
            {
                appointmentList = appointmentList.Where(x => x.CustomerId == query.CustomerId).ToList();
            }

            if (query.StylistId != null)
            {
                appointmentList = appointmentList.Where(x => x.StylistId == query.StylistId).ToList();
            }

            if (query.Status != null)
            {
                appointmentList = appointmentList.Where(x => x.Status == query.Status).ToList();
            }

            if (query.StartTime.HasValue)
            {
                appointmentList = appointmentList.Where(x => x.StartTime >= query.StartTime).ToList();
            }

            if (query.EndTime.HasValue)
            {
                appointmentList = appointmentList.Where(x => x.EndTime <= query.EndTime).ToList();
            }

            if (query.pageIndex.HasValue && query.pageSize.HasValue)
            {
                int validPageIndex = query.pageIndex.Value > 0 ? query.pageIndex.Value - 1 : 0;
                int validPageSize = query.pageSize.Value > 0 ? query.pageSize.Value : 10;

                appointmentList = appointmentList.Skip(validPageIndex * validPageSize).Take(validPageSize).ToList();
            }

            if (!appointmentList.Any())
            {
                return new ObjectResult(MessageConstant.AppointmentMessage.NotFound)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }

            // Create AppointmentResponse objects asynchronously
            var result = await Task.WhenAll(appointmentList.Select(async s => new AppointmentResponse
            {
                AppointmentId = s.AppointmentId,
                CustomerId = s.CustomerId,
                StylistId = s.StylistId,
                Status = s.Status,
                TotalPrice = s.TotalPrice,
                InsDate = s.InsDate,
                UpDate = s.UpDate,
                StartTime = s.StartTime,
                EndTime = s.EndTime,
                SevicesList = await _appointmentServiceRepository.GetByAppointmentId(s.AppointmentId),
            }));
            return new OkObjectResult(result);


        }

        public async Task<ActionResult<List<DateTime>>> GetSuitableSlot(QuerySlot request, HttpContext context)
        {
            var accountID = UserUtil.GetAccountId(context);
            if (accountID == null)
            {
                return new ObjectResult(MessageConstant.AppointmentMessage.NotFound)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }

            // Initiate schedule
            DateTime startOfDay = request.date.Date.AddHours(8); 
            DateTime endOfDay = request.date.Date.AddHours(17);
            //validate service and initiate duration
            var duration = 0;
            foreach(var service in request.ServiceId)
            {
                var existingService = await _serviceRepository.GetServiceById(service);
                if (existingService == null) {
                    return new ObjectResult(MessageConstant.ServiceMessage.NotFound)
                    {
                        StatusCode = StatusCodes.Status403Forbidden
                    };

                }
                duration += existingService.Duration;

            }
            //validate stylist
            var existStylist = await _stylistRepository.GetStylistById(request.StylistId);
            if (existStylist == null)
            {
                return new ObjectResult(MessageConstant.StylistMessage.StylistNotFound)
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }

            QueryAppointment queryAppointment = new QueryAppointment()
            {
                StylistId = request.StylistId,
                StartTime = startOfDay,
                Status = 2

            };
            // Get stylist appointment
            var appointmentList = await _appointmentRepository.GetAllAppointment();
            var existingAppointments =  appointmentList.Where(x => x.StylistId == request.StylistId && x .Status == 2 && x.StartTime >= startOfDay).ToList();
            
            // Innitiate slot
            List<DateTime> allTimeSlots = Enumerable.Range(0, 11)
                .Select(i => startOfDay.AddHours(i))
                .ToList();
            if (existingAppointments == null)
            {
                return new ObjectResult(allTimeSlots);
            }
            // Stylist available slot
            List<DateTime> availableTimeSlots = new List<DateTime>(allTimeSlots);

            foreach (var appointment in existingAppointments)
            {

                // Remove appointment from available
                availableTimeSlots.RemoveAll(slot =>
                    slot.Hour >= appointment.StartTime.Hour && slot.Hour < appointment.EndTime.Hour);
            }

            // Filter duration
            List<DateTime> suitableTimeSlots = new List<DateTime>();

            for (int i = 0; i < availableTimeSlots.Count; i++)
            {
                var slot = availableTimeSlots[i];
                DateTime endServiceTime = slot.AddMinutes(duration); 

                if (endServiceTime <= endOfDay)
                {
                    if (i < availableTimeSlots.Count - 1)
                    {
                        DateTime nextSlot = availableTimeSlots.Find(x => x.Hour == endServiceTime.Hour);
                        if (nextSlot != default) 
                        {
                            suitableTimeSlots.Add(slot);
                        }
                    }
                    else
                    {
                        suitableTimeSlots.Add(slot);
                    }
                }
            }

            return new ObjectResult(suitableTimeSlots);
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
            if (appointment == null)
            {

                return new ObjectResult(MessageConstant.AppointmentMessage.NotFound)
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }
            if (status != 1 && status != 2 && status != 3 && status != 4 && status != 5)
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
