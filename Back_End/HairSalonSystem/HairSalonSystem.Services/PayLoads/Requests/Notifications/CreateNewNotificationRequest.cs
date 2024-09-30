using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Requests.Notifications
{
    public class CreateNewNotificationRequest
    {
        [BsonElement("memberId")]
        public Guid MemberId { get; set; }
        [BsonElement("message")]
        public string Message { get; set; }
    }
}
