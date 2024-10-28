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
    public class FeedbackDAO : IFeedbackDAO
    {
        private readonly IMongoCollection<Feedback> _feedbackCollection;
        public FeedbackDAO(HairSalonContext context)
        {
            _feedbackCollection = context.Feedbacks;
        }
        public async Task AddFeedbackAsync(Feedback feedback)
        {
            await _feedbackCollection.InsertOneAsync(feedback);
        }

        public async Task<List<Feedback>> GetAllFeedbacksAsync()
        {
            return await _feedbackCollection
                .Find(b => b.DelFlg == true)
                .ToListAsync();
        }

        public async Task<Feedback> GetFeedbackByIdAsync(Guid feedbackId)
        {
            return await _feedbackCollection
                .Find(b => b.FeedbackId == feedbackId && b.DelFlg == true)
                .FirstOrDefaultAsync();
        }

        public async Task<List<Feedback>> GetFeedbacksByMemberIdAsync(Guid memberId)
        {
            return await _feedbackCollection
                .Find(b => b.MemberId == memberId && b.DelFlg == true)
                .ToListAsync();
        }

        public async Task<List<Feedback>> GetFeedbacksByStylistIdAsync(Guid stylistId)
        {
            return await _feedbackCollection
                .Find(b => b.StylistId == stylistId && b.DelFlg == true)
                .ToListAsync();
        }
        public async Task DeleteFeedbackAsync(Guid feedbackId)
        {
            var filter = Builders<Feedback>.Filter.Eq(f => f.FeedbackId, feedbackId);
            var update = Builders<Feedback>.Update.Set(f => f.DelFlg, false);
            await _feedbackCollection.UpdateOneAsync(filter, update);
        }
    }
}
