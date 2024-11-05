using HairSalonSystem.Services.PayLoads.Requests.Emails;
using Microsoft.Extensions.Configuration;
using MimeKit;
using MimeKit.Text;  
using System.Threading.Tasks;
using MailKit.Net.Smtp;


namespace HairSalonSystem.Services.Implements
{
    public class EmailService
    {
        private readonly IConfiguration _config;
        public EmailService(IConfiguration config)
        {
            _config = config;
        }
        public async Task SendEmail(EmailSendingFormat sendingFormat)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_config.GetSection("SmtpSettings:Username").Value));
            email.To.Add(MailboxAddress.Parse(sendingFormat.member));
            email.Subject = sendingFormat.Subject;
            email.Body = new TextPart(TextFormat.Html) { Text = sendingFormat.Information };

            using var smtp = new SmtpClient(); 
            await smtp.ConnectAsync(_config.GetSection("SmtpSettings:Host").Value, 587, MailKit.Security.SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(_config.GetSection("SmtpSettings:Username").Value, _config.GetSection("SmtpSettings:Password").Value);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }
    }
}
