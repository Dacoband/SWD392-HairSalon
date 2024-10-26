using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Requests.Feedbacks
{
    public class CreateNewFeedbackRequest
    {
        public Guid FeedbackId { get; set; }
        public Guid StylistId { get; set; }
        [BsonElement("Rating")]
        public int Rating { get; set; }
        [BsonElement("Comment")]
        public string Comment { get; set; } = string.Empty;
    }
}
