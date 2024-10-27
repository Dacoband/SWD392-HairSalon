using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace HairSalonSystem.Services.PayLoads.Responses.Feedbacks
{
    public class CreateFeedbackRepsonse
    {
        [Required]
        public Guid StylistId { get; set; }
        public Guid FeedbackId { get; set; }
        public string Message { get; set; }
    }
}
