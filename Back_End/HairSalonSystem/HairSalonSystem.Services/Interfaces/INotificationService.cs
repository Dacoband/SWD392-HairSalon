using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Services.PayLoads.Requests.Notifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.Interfaces
{
    public interface INotificationService
    {
        Task CreateNotification(CreateNewNotificationRequest notification);
        Task<Notifications> GetNotificationById(Guid id);
        Task<List<Notifications>> GetAllNotifications();
        Task<bool> UpdateNotification(Guid id, UpdateNotificationRequest notification);
        Task DeleteNotification(Guid id);
    }
}
