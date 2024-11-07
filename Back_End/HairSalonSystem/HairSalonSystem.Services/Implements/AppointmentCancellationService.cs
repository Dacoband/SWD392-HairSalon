using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Implement;
using HairSalonSystem.Repositories.Interface;
using HairSalonSystem.Services.Constant;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.PayLoads.Requests.Cancellation;
using HairSalonSystem.Services.PayLoads.Requests.Emails;
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

namespace HairSalonSystem.Services.Implements
{
    public class AppointmentCancellationService : IAppointmentCacellationService
    {
        private readonly IAppointmentCancellationRepository _cancellationRepo;
        private readonly IAppointmentRepository _appointmentRepo;
        private readonly IMemberRepository _memberRepo;
        private readonly IEmailService _emailService;
        private readonly IAccountRepository _accountRepo;

        public AppointmentCancellationService(IAppointmentCancellationRepository cancellationRepo, IAppointmentRepository appointmentRepo,IMemberRepository memberRepository, IEmailService emailService,IAccountRepository accountRepository)
        {
            _cancellationRepo = cancellationRepo;
            _appointmentRepo = appointmentRepo;
            _memberRepo = memberRepository;
            _emailService = emailService;
            _accountRepo = accountRepository;
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
            var memberList = await _memberRepo.GetAllMembers();
            var member = memberList.Where(x => x.AccountId == accountID).FirstOrDefault();

           

            var existAppointment = await _appointmentRepo.GetAppointmentById(req.AppointmetId);
            if (existAppointment == null) {
                return new ObjectResult(MessageConstant.AppointmentMessage.NotFound)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }

            if(existAppointment.CustomerId != member.MemberId && roleName != "ST") {

                return new ObjectResult(MessageConstant.CancelAppointmentMessage.CreateRight)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }
            if(existAppointment.Status == 4)
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
                InsDate = DateTime.Now,
                UpdDate = DateTime.Now,
                DelFlg = true

            };
            var status = 3;
            var account = await _accountRepo.GetAccountById(accountID);
            var appointment = await _appointmentRepo.GetAppointmentById(req.AppointmetId);

            try
            {

                await _appointmentRepo.UpdateAppointmentStatus(existAppointment.AppointmentId, status);
                var emailSendingFormat = new EmailSendingFormat
                {
                    member = account.Email,
                    Subject = "Your Payment Was Successful",
                    Information = GenerateCancelAppointmentEmailBody(appointment)
                };

                await _emailService.SendEmail(emailSendingFormat);
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
        private string GenerateCancelAppointmentEmailBody(Appointment appointment)
        {
            string logoUrl = "https://drive.google.com/uc?export=view&id=1cjCSKHpV1HAQxgk-9vWDPZWaUJC4XYVr";

            return $@"
        <html>
    <body style='font-family: Arial, sans-serif; color: #333; line-height: 1.6;'>
        <div style='max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;'>
            <!-- Logo -->
            <div style='text-align: center; padding-bottom: 20px;'>
                <img src='{logoUrl}' alt='Salon Logo' style='width: 150px; height: auto;'/>
            </div>

            <!-- Nội dung Email -->
            <h2 style='color: #4CAF50; text-align: center;'>Thông Báo Thanh Toán Thành Công</h2>
            <p style='text-align: center;'>Kính gửi <strong>{appointment.CustomerId}</strong>,</p>
            
            <p>Chúng tôi vui mừng thông báo rằng thanh toán của bạn cho cuộc hẹn vào ngày 
                <strong>{appointment.InsDate.ToString("dd/MM/yyyy")}</strong> lúc 
                <strong>{appointment.EndTime}</strong> đã được xử lý thành công.</p>

            <p>Chi tiết cuộc hẹn của bạn như sau:</p>
            <ul style='list-style: none; padding-left: 0;'>
                <li><strong>ID Cuộc Hẹn:</strong> {appointment.AppointmentId}</li>
                <li><strong>Ngày:</strong> {appointment.InsDate.ToString("dd/MM/yyyy")}</li>
                <li><strong>Thời Gian:</strong> {appointment.StartTime} - {appointment.EndTime}</li>
                <li><strong>Khách Hàng:</strong> {appointment.CustomerId}</li>
            </ul>

            <p>Nếu bạn có bất kỳ câu hỏi nào hoặc muốn thay đổi lịch hẹn, vui lòng liên hệ với chúng tôi.</p>

            <!-- Thông Tin Liên Hệ -->
            <div style='border-top: 1px solid #ddd; padding-top: 20px; text-align: center; color: #888;'>
                <p>Cảm ơn bạn đã chọn salon của chúng tôi. Chúng tôi rất mong được phục vụ bạn!</p>
                <p>Trân trọng,<br>Đội ngũ Salon của bạn</p>
                <p style='font-size: 12px;'>Liên hệ với chúng tôi: (+84) 0948780759 | info@hairsalon.com</p>
                <p style='font-size: 12px; color: #888;'>© 2024 Hair Salon. Bảo lưu mọi quyền.</p>
            </div>
        </div>
    </body>
    </html>";
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
