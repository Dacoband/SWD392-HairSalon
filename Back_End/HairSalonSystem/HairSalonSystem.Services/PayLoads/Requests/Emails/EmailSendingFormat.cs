using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Requests.Emails
{
    public class EmailSendingFormat
    {
        public required string Information { get; set; }
        public required string Subject { get; set; } = "";
        public required string member { get; set; } 
    }
}
