using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.DAOs.Interfaces;
using HairSalonSystem.Repositories.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Repositories.Implement
{
    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly IFeedbackDAO _feedbackDao;
        public FeedbackRepository(IFeedbackDAO feedbackDao)
        {
            _feedbackDao = feedbackDao;
        }

        public async Task AddFeedbackAsync(Feedback feedback)
        {
            await _feedbackDao.AddFeedbackAsync(feedback);
        }

        public async Task DeleteFeedbackAsync(Guid feedbackId)
        {
            await _feedbackDao.DeleteFeedbackAsync(feedbackId);
        }

        public async Task<List<Feedback>> GetAllFeedbacksAsync()
        {
            return await _feedbackDao.GetAllFeedbacksAsync();
        }

        public async Task<Feedback> GetFeedbackByIdAsync(Guid feedbackId)
        {
            return await _feedbackDao.GetFeedbackByIdAsync(feedbackId);
        }

        public async Task<List<Feedback>> GetFeedbacksByMemberIdAsync(Guid memberId)
        {
            return await _feedbackDao.GetFeedbacksByMemberIdAsync(memberId);
        }

        public async Task<List<Feedback>> GetFeedbacksByStylistIdAsync(Guid stylistId)
        {
            return await _feedbackDao.GetFeedbacksByStylistIdAsync(stylistId);
        }
    }
}
