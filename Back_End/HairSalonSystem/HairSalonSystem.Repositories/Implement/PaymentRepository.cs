using HairSalonSystem.BusinessObject.Entities;
using System.Threading.Tasks;
using HairSalonSystem.BusinessObject;
using MongoDB.Driver;

namespace HairSalonSystem.Repositories.Implement
{
    public class PaymentRepository
    {
        private readonly IMongoCollection<Payment> _payments;

        public PaymentRepository(HairSalonContext context)
        {
            _payments = context.Payments;
        }

        public async Task InsertPayment(Payment payment)
        {
            await _payments.InsertOneAsync(payment);
        }

        public async Task<Payment> GetPaymentByPaymentLinkId(string paymentLinkId)
        {
            return await _payments.Find(p => p.PaymentLinkId == paymentLinkId).FirstOrDefaultAsync();
        }
        public async Task<Payment> GetPaymentById(Guid paymentId)
        {
            return await _payments.Find(p => p.Id == paymentId).FirstOrDefaultAsync();
        }
    }
}
