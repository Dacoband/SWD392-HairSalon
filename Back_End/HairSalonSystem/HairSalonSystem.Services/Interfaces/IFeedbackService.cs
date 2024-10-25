using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Services.PayLoads.Requests.Feedbacks;
using HairSalonSystem.Services.PayLoads.Responses.Feedbacks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.Interfaces
{
    public interface IFeedbackService
    {
        Task<CreateFeedbackRepsonse> CreateFeedbackAsync(CreateNewFeedbackRequest request, HttpContext httpContext);
        Task<ActionResult<List<Feedback>>> GetAllFeedbackAsync();
        Task<ActionResult<Feedback>> GetFeedbackByIdAsync(Guid id);
        Task<ActionResult<List<Feedback>>> GetFeedbackByMemberIdAsync(Guid memberId);
        Task<ActionResult<List<Feedback>>> GetFeedbackByStylistIdAsync(Guid stylistId);
        Task<DeleteFeedbackResponse> DeleteFeedbackAsync(Guid id);
    }
}
