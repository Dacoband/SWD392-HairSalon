using HairSalonSystem.BusinessObject;
using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.DAOs.Interfaces;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.DAOs.Implements
{
    public class NotificationDAO : INotificationDAO
    {
        private readonly IMongoCollection<Notifications> _notifications;
        public NotificationDAO(HairSalonContext context)
        {
            _notifications = context.Notifications;
        }
        public async Task CreateNotification(Notifications notification)
        {
            await _notifications.InsertOneAsync(notification);
        }
        public async Task<Notifications> GetNotificationById(Guid id)
        {
            return await _notifications.Find(n => n.NotificationId == id).FirstOrDefaultAsync();
        }
        public async Task<List<Notifications>> GetAllNotifications()
        {
            return await _notifications.Find(_ => true).ToListAsync();
        }
        public async Task UpdateNotification(Guid id, Notifications notification)
        {
            await _notifications.ReplaceOneAsync(n => n.NotificationId == id, notification);
        }
        public async Task DeleteNotification(Guid id)
        {
            await _notifications.DeleteOneAsync(n => n.NotificationId == id);
        }

    }
}
