using HairSalonSystem.BusinessObject.Entities;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Responses.Cancellation
{
    public class CancellationResponse
    {
        public Guid CancellationId { get; set; }
        public string Reason { get; set; }
        public DateTime InsDate { get; set; }
        public DateTime UpdDate { get; set; }
        public bool DelFlg { get; set; }
        public BusinessObject.Entities.Appointment appointment { get; set; }
    }
}
