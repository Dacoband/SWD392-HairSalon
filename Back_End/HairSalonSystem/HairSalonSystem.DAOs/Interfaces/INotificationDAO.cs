using HairSalonSystem.BusinessObject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.DAOs.Interfaces
{
    public interface INotificationDAO
    {
        Task CreateNotification(Notifications notification);
        Task<Notifications> GetNotificationById(Guid id);
        Task<List<Notifications>> GetAllNotifications();
        Task UpdateNotification(Guid id, Notifications notification);
        Task DeleteNotification(Guid id);
    }
}
