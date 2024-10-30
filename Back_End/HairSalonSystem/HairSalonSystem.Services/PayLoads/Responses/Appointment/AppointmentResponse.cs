using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HairSalonSystem.BusinessObject.Entities;

namespace HairSalonSystem.Services.PayLoads.Responses.Appointment
{
    public class AppointmentResponse
    {
       
        public Guid AppointmentId { get; set; }
       
        public Guid CustomerId { get; set; }
       
        public Guid StylistId { get; set; }
       
        public int Status { get; set; }
        // 1: created -> 2: paid -> 3: cancel by cus -> 4: cancel by salon -> 5: completed 

        public float TotalPrice { get; set; }  
        public DateTime InsDate { get; set; }
        public DateTime UpDate { get; set; }   
        public DateTime StartTime { get; set; }     
        public DateTime EndTime { get; set; }
        public List<BusinessObject.Entities.AppointmentService> SevicesList { get; set; }

    }
}