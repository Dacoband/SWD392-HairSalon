using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Requests.Appointment
{
    public class CreateAppointmentRequest
    {
        public Guid StylistId { get; set; }
        public DateTime AppointmentDate { get; set; }
        public List<Guid> ServiceIds { get; set; }
    }
}
