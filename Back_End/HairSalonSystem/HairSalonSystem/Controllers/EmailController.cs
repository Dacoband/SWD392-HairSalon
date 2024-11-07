using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Interface;
using HairSalonSystem.Services.Implements;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.PayLoads.Requests.Emails;
using HairSalonSystem.Services.Util;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace HairSalonSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmailController : ControllerBase
    {
        private readonly IEmailService _emailService;
        private readonly IAppointmentRepository _appointmentService;
        private readonly IAccountService _accountService;

        public EmailController(IEmailService emailService,IAppointmentRepository appointmentService,IAccountService accountService)
        {
            _emailService = emailService;
            _appointmentService = appointmentService;
            _accountService = accountService;
        }

        // Endpoint to send email when appointment status is 2
        [HttpPost("send-appointment-notification")]
        public async Task<IActionResult> SendAppointmentNotification(Guid appointmentId)
        {
            Guid? accountID = UserUtil.GetAccountId(HttpContext);
            if (accountID == null)
                return Unauthorized("Unauthorized access.");
            var account = await _accountService.GetAccountById(accountID.Value);
            var email = account.Email;
            var appointment = await _appointmentService.GetAppointmentById(appointmentId);

            if (appointment == null)
                return NotFound("Appointment not found.");

            if (appointment.Status != 2)
                return BadRequest("Appointment status is not set to 2.");

            var emailSendingFormat = new EmailSendingFormat
            {
                member = email , 
                Subject = "Your Appointment Status Update",
                Information = GenerateEmailBody(appointment) // Nội dung email theo mẫu HTML
            };


            await _emailService.SendEmail(emailSendingFormat);

            return Ok("Email sent successfully.");
        }

        // Function to create a beautiful HTML email template
        private string GenerateEmailBody(Appointment appointment)
        {
            return $@"
                <html>
                <body style='font-family: Arial, sans-serif;'>
                    <h2 style='color: #4CAF50;'>Appointment Status Update</h2>
                    <p>Hello {appointment.CustomerId},</p>
                    <p>Your appointment scheduled for <strong>{appointment.InsDate.ToString("MMMM dd, yyyy")}</strong> at 
                       <strong>{appointment.EndTime}</strong> has been updated to status 2.</p>
                    <p>If you have any questions, please contact us.</p>
                    <br>
                    <p>Best Regards,<br>Your Hair Salon Team</p>
                </body>
                </html>";
        }
    }
}
