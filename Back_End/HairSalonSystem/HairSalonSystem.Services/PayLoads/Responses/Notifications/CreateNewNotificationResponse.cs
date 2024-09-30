using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Responses.Notifications
{
    public class CreateNewNotificationResponse
    {
        public Guid MemberId { get; set; }
        public string Message { get; set; }
        public DateTime InsDate { get; set; }
    }
}
