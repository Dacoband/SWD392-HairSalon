using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Requests.Appointment
{
    public interface CreateAppointmentRequest
    {
        Guid StylistId { get; set; }
        DateTime AppointmentDate { get; set; }
        List<Guid> ServiceIds { get; set; }
    }
}
