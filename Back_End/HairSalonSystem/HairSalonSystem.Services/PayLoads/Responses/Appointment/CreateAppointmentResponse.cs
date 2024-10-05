using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Responses.Appointment
{
    public class CreateAppointmentResponse
    {
        public Guid AppointmentId { get; set; }
      
        public Guid CustomerId { get; set; }
       
        public Guid StylistId { get; set; }
        
      
        public int Status { get; set; }
       
        public float TotalPrice { get; set; }

        public DateTime InsDate { get; set; }
     
        public DateTime UpDate { get; set; }
        public DateTime AppoinmentDate { get; set; }
        public List<Guid> Appoinments { get; set; }
        public int Duration {  get; set; }
    }
}
