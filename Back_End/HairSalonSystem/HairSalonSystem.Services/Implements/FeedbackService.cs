using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Interface;
using HairSalonSystem.Services.Constant;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.PayLoads.Requests.Feedbacks;
using HairSalonSystem.Services.PayLoads.Responses.Feedbacks;
using HairSalonSystem.Services.Util;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.Implements
{
    public class FeedbackService : IFeedbackService
    {
        private readonly IFeedbackRepository _feedbackRepository;
        private readonly IStylistRepository _stylistRepository;
        private readonly IMemberRepository _memberRepository;
        public FeedbackService(IFeedbackRepository feedbackRepository, IStylistRepository stylistRepository, IMemberRepository memberRepository)
        {
            _feedbackRepository = feedbackRepository;
            _stylistRepository = stylistRepository;
            _memberRepository = memberRepository;
        }

        public async Task<CreateFeedbackRepsonse> CreateFeedbackAsync(CreateNewFeedbackRequest request, HttpContext httpContext)
        {
            var roleName = UserUtil.GetRoleName(httpContext);
            if (roleName != Enums.RoleEnums.MB.ToString())
            {
                return new CreateFeedbackRepsonse { Message = MessageConstant.FeedbackMessage.NotRight };
            }
            Guid? account = UserUtil.GetAccountId(httpContext);
            if (account == null)
            {
                return new CreateFeedbackRepsonse { Message = MessageConstant.FeedbackMessage.NotRight};
            }
            //var member = await _memberRepository.GetMemberById(account.Value);
            var stylist = await _stylistRepository.GetStylistById(request.StylistId);
            var feedback = new Feedback
            {
                FeedbackId = Guid.NewGuid(),
                MemberId = account.Value,
                StylistId = stylist.StylistId,
                Rating = request.Rating,
                Comment = request.Comment,
                InsDate = DateTime.Now,
                UpdDate = DateTime.Now,
                DelFlg = true
            };
            await _feedbackRepository.AddFeedbackAsync(feedback);
            await UpdateStylistAverageRating(feedback.StylistId);

            return new CreateFeedbackRepsonse { Message = MessageConstant.FeedbackMessage.CreateSuccess };
        }

        private async Task UpdateStylistAverageRating(Guid stylistId)
        {
            var feedbacks = await _feedbackRepository.GetFeedbacksByStylistIdAsync(stylistId);
            double AverageRating = feedbacks.Average(f => f.Rating);
            var stylist = await _stylistRepository.GetStylistById(stylistId);
            if(stylist == null)
            {
                new KeyNotFoundException(MessageConstant.StylistMessage.StylistNotFound); 
            }
            stylist.AverageRating = AverageRating;
            await _stylistRepository.UpdateStylistAverageRatingAsync(stylistId, AverageRating);

        }

        public async Task<DeleteFeedbackResponse> DeleteFeedbackAsync(Guid id)
        {
             await _feedbackRepository.DeleteFeedbackAsync(id);
            return new DeleteFeedbackResponse {Message = MessageConstant.FeedbackMessage.DeleteSuccess};
        }

        public async Task<ActionResult<List<Feedback>>> GetAllFeedbackAsync()
        {
            if (await _feedbackRepository.GetAllFeedbacksAsync() == null)
            {
                return new ObjectResult(MessageConstant.FeedbackMessage.NotFound)
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }
            return await _feedbackRepository.GetAllFeedbacksAsync();
        }

        public async Task<ActionResult<Feedback>> GetFeedbackByIdAsync(Guid id)
        {
            if(await _feedbackRepository.GetFeedbackByIdAsync(id) == null)
            {
                return new ObjectResult(MessageConstant.FeedbackMessage.NotFound)
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }
            return await _feedbackRepository.GetFeedbackByIdAsync(id);
        }

        public async Task<ActionResult<List<Feedback>>> GetFeedbackByMemberIdAsync(Guid memberId)
        {
            if(await _feedbackRepository.GetFeedbacksByMemberIdAsync(memberId) == null)
            {
                return new ObjectResult(MessageConstant.MemberMessage.MemberNotFound)
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }
            return await _feedbackRepository.GetFeedbacksByMemberIdAsync(memberId);
            
        }

        public async Task<ActionResult<List<Feedback>>> GetFeedbackByStylistIdAsync(Guid stylistId)
        {
            if(await _feedbackRepository.GetFeedbacksByStylistIdAsync(stylistId) == null)
            {
                return new ObjectResult(MessageConstant.StylistMessage.StylistNotFound)
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }
            return await _feedbackRepository.GetFeedbacksByStylistIdAsync(stylistId);   
        }
    }
}
