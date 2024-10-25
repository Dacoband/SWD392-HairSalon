using HairSalonSystem.BusinessObject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Repositories.Interface
{
    public interface IFeedbackRepository
    {
        Task<List<Feedback>> GetAllFeedbacksAsync();
        Task<Feedback> GetFeedbackByIdAsync(Guid feedbackId);
        Task<List<Feedback>> GetFeedbacksByMemberIdAsync(Guid memberId);
        Task<List<Feedback>> GetFeedbacksByStylistIdAsync(Guid stylistId);
        Task AddFeedbackAsync(Feedback feedback);
        Task DeleteFeedbackAsync(Guid feedbackId);
    }
}
