using HairSalonSystem.Services.PayLoads.Requests.Emails;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.Interfaces
{
    public interface IEmailService
    {
        public Task SendEmail(EmailSendingFormat sendingFormat);
    }
}
