using HairSalonSystem.BusinessObject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Repositories.Interface
{
    public interface IAppointmentCancellationRepository
    {
        Task CreateCancellation(AppointmentCancellation cancellation);
        Task<List<AppointmentCancellation>> GetAll();
        Task<AppointmentCancellation> GetByAppointmentId(Guid appointmentId);
        Task<AppointmentCancellation> GetByCancellationId(Guid cancellationId);
    }
}
