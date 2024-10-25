using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Services.Constant;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.PayLoads.Requests.Feedbacks;
using HairSalonSystem.Services.PayLoads.Responses.Feedbacks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HairSalonSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService _feedbackService;

        public FeedbackController(IFeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
        }

        [HttpGet(APIEndPointConstant.Feedback.GetAllFeedbacks)]
        [ProducesResponseType(typeof(List<Feedback>), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        public async Task<ActionResult<List<Feedback>>> GetAllFeedbacks()
        {
            var feedbacks = await _feedbackService.GetAllFeedbackAsync();
            return Ok(feedbacks);
        }

        [HttpGet(APIEndPointConstant.Feedback.GetFeedbackById)]
        [ProducesResponseType(typeof(Feedback), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        public async Task<ActionResult<Feedback>> GetFeedbackById(Guid id)
        {
            var feedback = await _feedbackService.GetFeedbackByIdAsync(id);
            return Ok(feedback);
        }


        [HttpGet(APIEndPointConstant.Feedback.GetFeedbackByMemberId)]
        [ProducesResponseType(typeof(List<Feedback>), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        public async Task<ActionResult<List<Feedback>>> GetFeedbackByMemberId(Guid memberId)
        {
            var feedbacks = await _feedbackService.GetFeedbackByMemberIdAsync(memberId);
            return Ok(feedbacks);
        }

        [HttpGet(APIEndPointConstant.Feedback.GetFeedbackByStylistId)]
        [ProducesResponseType(typeof(List<Feedback>), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        public async Task<ActionResult<List<Feedback>>> GetFeedbackByStylistId(Guid stylistId)
        {
            var feedbacks = await _feedbackService.GetFeedbackByStylistIdAsync(stylistId);
            return Ok(feedbacks);
        }

        [HttpPost(APIEndPointConstant.Feedback.AddFeedback)]
        [ProducesResponseType(typeof(CreateFeedbackRepsonse), StatusCodes.Status201Created)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        public async Task<ActionResult<Feedback>> AddFeedback([FromBody] CreateNewFeedbackRequest feedback)
        {
            await _feedbackService.CreateFeedbackAsync(feedback, HttpContext);
            return CreatedAtAction(nameof(GetFeedbackById), new { id = feedback.FeedbackId}, feedback);
        }

        [HttpDelete(APIEndPointConstant.Feedback.DeleteFeedback)]
        [Authorize(Roles = "SA,SM")]
        [ProducesResponseType(typeof(Feedback), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        public async Task<ActionResult<Feedback>> DeleteFeedback(Guid id)
        {
            var feedback = await _feedbackService.DeleteFeedbackAsync(id);
            return Ok(feedback);
        }
    }
}
