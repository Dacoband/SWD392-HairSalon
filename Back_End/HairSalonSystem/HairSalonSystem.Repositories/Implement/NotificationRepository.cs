using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HairSalonSystem.DAOs.Interfaces;

namespace HairSalonSystem.Repositories.Implement
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly INotificationDAO _notificationDao;
        public NotificationRepository(INotificationDAO notificationDao)
        {
            _notificationDao = notificationDao;
        }
        public async Task CreateNotification(Notifications notification)
        {
            await _notificationDao.CreateNotification(notification);
        }
        public async Task DeleteNotification(Guid id)
        {
            await _notificationDao.DeleteNotification(id);
        }
        public async Task<Notifications> GetNotificationById(Guid id)
        {
            return await _notificationDao.GetNotificationById(id);
        }
        public async Task<List<Notifications>> GetAllNotifications()
        {
            return await _notificationDao.GetAllNotifications();
        }
        public async Task UpdateNotification(Guid id, Notifications notification)
        {
            await _notificationDao.UpdateNotification(id, notification);
        }
    }
}
