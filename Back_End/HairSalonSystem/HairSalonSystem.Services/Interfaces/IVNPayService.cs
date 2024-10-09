using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.Interfaces
{
    public interface IVNPayService
    {
        string CreatePaymentUrl(decimal amount, string orderInfo, Guid paymentId);
        bool VerifyPaymentResponse(IQueryCollection vnpayData);
    }
}
