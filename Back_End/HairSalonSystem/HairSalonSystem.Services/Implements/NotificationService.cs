using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Interface;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.PayLoads.Requests.Notifications;
using HairSalonSystem.Services.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.Implements
{
    public class NotificationService : INotificationService
    {
        private readonly INotificationRepository _notificationRepository;
        private readonly IMemberRepository _memberRepository;
        public NotificationService(INotificationRepository notificationRepository, IMemberRepository memberRepository)
        {
            _notificationRepository = notificationRepository;
            _memberRepository = memberRepository;
        }
        public async Task CreateNotification(CreateNewNotificationRequest notificationRequest)
        {
            var notification = new Notifications
            {
                NotificationId = Guid.NewGuid(),
                MemberId = notificationRequest.MemberId,
                Message = notificationRequest.Message,
                InsDate = DateTime.Now
            };
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
        public async Task<bool> UpdateNotification(Guid id, UpdateNotificationRequest notificationRequest)
        {
            var notification = await _notificationRepository.GetNotificationById(id);
            if (notification == null)
            {
                return false;
            }
            notification.Message = notificationRequest.Message;
            await _notificationRepository.UpdateNotification(id, notification);
            return true;
        }
    }
}
