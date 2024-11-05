using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Services.Constant;
using HairSalonSystem.Services.Controllers;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.PayLoads.Requests.Notifications;
using HairSalonSystem.Services.PayLoads.Responses.Notifications;
using Microsoft.AspNetCore.Mvc;

namespace HairSalonSystem.API.Controllers
{
    [ApiController]
    public class NotificationController : BaseController<NotificationController>
    {
        private readonly INotificationService _notificationService;
        private readonly IMemberService _memberService;
        public NotificationController(ILogger<NotificationController> logger, INotificationService notificationService, IMemberService memberService) : base(logger)
        {
            _notificationService = notificationService;
            _memberService = memberService;

        }
        [HttpGet(APIEndPointConstant.Notification.GetNotificationById)]
        [ProducesResponseType(typeof(Notifications), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]

        public async Task<ActionResult<Notifications>> GetNotificationById(Guid id)
        {
            var notification = await _notificationService.GetNotificationById(id);
            if (notification == null)
            {
                return NotFound();
            }
            return Ok(notification);
        }
        [HttpGet(APIEndPointConstant.Notification.GetAllNotifications)]
        [ProducesResponseType(typeof(List<Notifications>), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]

        public async Task<ActionResult<List<Notifications>>> GetAllNotifications()
        {
            var notifications = await _notificationService.GetAllNotifications();
            return Ok(notifications);
        }
        [HttpPost(APIEndPointConstant.Notification.AddNotification)]
        [ProducesResponseType(typeof(CreateNewNotificationResponse), StatusCodes.Status201Created)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        public async Task<ActionResult> AddNotification([FromBody] CreateNewNotificationRequest notificationDto)
        {
            var member = await _memberService.GetMemberById(notificationDto.MemberId);
            if (member == null)
            {
                return Problem(MessageConstant.MemberMessage.MemberNotFound);
            }
            await _notificationService.CreateNotification(notificationDto);
            return CreatedAtAction(nameof(GetNotificationById), new { id = notificationDto.MemberId}, notificationDto);
        }

    }
}
