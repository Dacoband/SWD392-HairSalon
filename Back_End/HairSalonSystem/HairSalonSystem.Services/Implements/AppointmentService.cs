using Amazon.Runtime.Internal;
using Amazon.Runtime.Internal.Util;
<<<<<<< HEAD
=======
using Firebase.Auth;
>>>>>>> Thaiyud
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
using System.Collections;
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
<<<<<<< HEAD

        public AppointmentService(IAppointmentRepository appointmentRepository, IStylistRepository stylistRepository, IServiceRepository serviceRepository
, IAppointmentServiceRepository appointmentServiceRepository, IMongoClient mongoClient
=======
        private readonly IMemberRepository _memberRepository;

        public AppointmentService(IAppointmentRepository appointmentRepository, IStylistRepository stylistRepository, IServiceRepository serviceRepository
, IAppointmentServiceRepository appointmentServiceRepository, IMongoClient mongoClient, IMemberRepository memberRepository
>>>>>>> Thaiyud
)
        {
            _mongoClient = mongoClient; 
            _appointmentRepository = appointmentRepository;
            _stylistRepository = stylistRepository;
            _serviceRepository = serviceRepository;
            _appointmentServiceRepository = appointmentServiceRepository;
<<<<<<< HEAD
=======
            _memberRepository = memberRepository;
>>>>>>> Thaiyud

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
        
            var memberList = await _memberRepository.GetAllMembers();
            var member = memberList.Where(x => x.AccountId == accountID).FirstOrDefault();
            //initiate
            List<BusinessObject.Entities.Appointment> appointments = await _appointmentRepository.GetAllAppointment();
            List<BusinessObject.Entities.AppointmentService> appointmentDetails = new List<BusinessObject.Entities.AppointmentService>();
            BusinessObject.Entities.Appointment appointment = new BusinessObject.Entities.Appointment
            {
                AppointmentId = Guid.NewGuid(),
                TotalPrice = 0,
<<<<<<< HEAD
                CustomerId = (Guid)accountID,
=======
                CustomerId = (Guid)member.MemberId,
>>>>>>> Thaiyud
                Status = 1,
                InsDate = DateTime.Now,
                UpDate = DateTime.Now
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
<<<<<<< HEAD

            // Fetch all appointments from the repository
            var appointmentList = await _appointmentRepository.GetAllAppointment();

            // Apply filters based on query parameters
            if (query.BranchId != null)
            {
=======

            var roleName = UserUtil.GetRoleName(context);
            if(roleName == "MB")
            {

                var memberList = await _memberRepository.GetAllMembers();
                var member = memberList.Where(x => x.AccountId == accountID).FirstOrDefault();
                query.CustomerId = member.MemberId;
            }
            if (roleName == "ST")
            {
                var stylistList = await _stylistRepository.GetAllStylist();
                var stylist = stylistList.Where(x => x.AccountId != accountID).FirstOrDefault();
                query.StylistId = stylist.StylistId;
            }

            // Fetch all appointments from the repository
            var appointmentList = await _appointmentRepository.GetAllAppointment();

            // Apply filters based on query parameters
            if (query.BranchId != null)
            {
>>>>>>> Thaiyud
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
<<<<<<< HEAD
                appointmentList = appointmentList.Where(x => x.StartTime >= query.StartTime).ToList();
=======
                var queryDate = query.StartTime.Value.Date; 
                appointmentList = appointmentList
                    .Where(x => x.StartTime.Date == queryDate && x.StartTime >= query.StartTime)
                    .ToList();
>>>>>>> Thaiyud
            }

            if (query.EndTime.HasValue)
            {
<<<<<<< HEAD
                appointmentList = appointmentList.Where(x => x.EndTime <= query.EndTime).ToList();
=======
                var queryDate = query.StartTime.Value.Date; 
                appointmentList = appointmentList
                    .Where(x => x.EndTime.Date == queryDate && x.EndTime <= query.EndTime)
                    .ToList();
>>>>>>> Thaiyud
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

<<<<<<< HEAD
=======
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
                return new ObjectResult(MessageConstant.AppointmentMessage.NotRight)
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
                        StatusCode = StatusCodes.Status404NotFound
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

>>>>>>> Thaiyud
            QueryAppointment queryAppointment = new QueryAppointment()
            {
                StylistId = request.StylistId,
                StartTime = startOfDay,
                Status = 2

            };
            // Get stylist appointment
            var appointmentList = await _appointmentRepository.GetAllAppointment();
<<<<<<< HEAD
            var existingAppointments =  appointmentList.Where(x => x.StylistId == request.StylistId && x .Status == 2 && x.StartTime >= startOfDay).ToList();
=======
            var existingAppointments =  appointmentList.Where(x => x.StylistId == request.StylistId && (x .Status == 2 || x.Status == 1) && x.StartTime >= startOfDay).ToList();
>>>>>>> Thaiyud
            
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
<<<<<<< HEAD

                // Remove appointment from available
                availableTimeSlots.RemoveAll(slot =>
                    slot.Hour >= appointment.StartTime.Hour && slot.Hour < appointment.EndTime.Hour);
=======
                // Remove appointment from available
                if (appointment.EndTime.Minute == 0)
                {
                    // Remove slots from StartTime's hour up to, but not including, EndTime's hour
                    availableTimeSlots.RemoveAll(slot =>
                        slot.Hour == appointment.StartTime.Hour && slot.Minute >= appointment.StartTime.Minute ||
                        slot.Hour > appointment.StartTime.Hour && slot.Hour < appointment.EndTime.Hour);
                }
                else
                {
                    // Remove slots from StartTime's hour up to and including EndTime's hour and minute
                    availableTimeSlots.RemoveAll(slot =>
                        (slot.Hour == appointment.StartTime.Hour && slot.Minute >= appointment.StartTime.Minute) ||
                        (slot.Hour > appointment.StartTime.Hour && slot.Hour < appointment.EndTime.Hour) ||
                        (slot.Hour == appointment.EndTime.Hour && slot.Minute <= appointment.EndTime.Minute));
                }

>>>>>>> Thaiyud
            }

            // Filter duration
            List<DateTime> suitableTimeSlots = new List<DateTime>();

            for (int i = 0; i < availableTimeSlots.Count; i++)
            {
                var slot = availableTimeSlots[i];
                DateTime endServiceTime = slot.AddMinutes(duration); 

<<<<<<< HEAD
                if (endServiceTime <= endOfDay)
                {
                    if (i < availableTimeSlots.Count - 1)
                    {
                        DateTime nextSlot = availableTimeSlots.Find(x => x.Hour == endServiceTime.Hour);
=======
               
                    if (i < availableTimeSlots.Count - 1)
                    {
                        DateTime nextSlot = availableTimeSlots.Find(x => x.Hour == endServiceTime.Hour );
>>>>>>> Thaiyud
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
<<<<<<< HEAD
            }

            return new ObjectResult(suitableTimeSlots);
=======
            

            return new ObjectResult(suitableTimeSlots);
        }

        public async Task<ActionResult<Stylist>> GetSuitableStylist(QueryStylist query, HttpContext context)
        {
            var accountID = UserUtil.GetAccountId(context);
            if (accountID == null)
            {
                return new ObjectResult(MessageConstant.AppointmentMessage.NotFound)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }
            var endTime = query.StartTime;
            
            foreach (var service in query.ServiceIds)
            {
                var existingService = await _serviceRepository.GetServiceById(service);
                if (existingService == null)
                {
                    return new ObjectResult(MessageConstant.ServiceMessage.NotFound)
                    {
                        StatusCode = StatusCodes.Status404NotFound
                    };

                }
                endTime = endTime.AddMinutes(existingService.Duration);
            }
           
            var stylistList = await _stylistRepository.GetStylistByBranchId(query.BranchId);
            var appointmentList = await _appointmentRepository.GetAllAppointment();
            appointmentList = appointmentList
    .Where(x => x.StartTime < endTime && x.EndTime > query.StartTime && x.Status == 2)
    .ToList();
            var stylistIds = appointmentList.Select(x => x.StylistId).Distinct().ToList();

            stylistList.RemoveAll(stylist => stylistIds.Contains(stylist.StylistId));


            return new OkObjectResult(stylistList[0]);
>>>>>>> Thaiyud
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
            var userId = new Guid();

            if (roleName == "MB")
            {

                var memberList = await _memberRepository.GetAllMembers();
                var member = memberList.Where(x => x.AccountId == accountID).FirstOrDefault();
                userId = member.MemberId;
            }
            if(roleName == "ST")
            {
                var stylistList = await _stylistRepository.GetAllStylist();
                var stylist = stylistList.Where(x => x.AccountId != accountID).FirstOrDefault();
                userId = stylist.StylistId;
            }
            if (userId != appointment.StylistId && userId != appointment.CustomerId && roleName != "SL")
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
            if(status == 4) {
            if(DateTime.Now.CompareTo(appointment.EndTime) < 0) {
                    return new ObjectResult(MessageConstant.AppointmentMessage.InvalidComplete)
                    {
                        StatusCode = StatusCodes.Status400BadRequest
                    };
                }
            
            }
            if (status == 3)
            {
                if (DateTime.Now.CompareTo(appointment.StartTime) > 0)
                {
                    status = 5;
                   
                }

            }
            try
            {
                appointment.Status = status;
                appointment.UpDate = DateTime.Now;
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
