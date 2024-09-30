using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Repositories.Implement
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly INotificationRepository _notificationRepository;
        public NotificationRepository(INotificationRepository notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }
        public async Task CreateNotification(Notifications notification)
        {
            await _notificationRepository.CreateNotification(notification);
        }
        public async Task DeleteNotification(Guid id)
        {
            await _notificationRepository.DeleteNotification(id);
        }
        public async Task<Notifications> GetNotificationById(Guid id)
        {
            return await _notificationRepository.GetNotificationById(id);
        }
        public async Task<List<Notifications>> GetAllNotifications()
        {
            return await _notificationRepository.GetAllNotifications();
        }
        public async Task UpdateNotification(Guid id, Notifications notification)
        {
            await _notificationRepository.UpdateNotification(id, notification);
        }
    }
}
