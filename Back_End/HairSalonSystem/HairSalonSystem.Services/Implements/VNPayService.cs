using HairSalonSystem.BusinessObject;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.Util;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.Implements
{
    public class VNPayService : IVNPayService
    {
        private readonly VNPaySettings _vnpaySettings;

        public VNPayService(IOptions<VNPaySettings> vnpaySettings)
        {
            _vnpaySettings = vnpaySettings.Value;
        }

        public string CreatePaymentUrl(decimal amount, string orderInfo, Guid paymentId)
        {
            var vnpay = new VnPayLibrary();
            vnpay.AddRequestData("vnp_Version", "2.1.0");
            vnpay.AddRequestData("vnp_Command", "pay");
            vnpay.AddRequestData("vnp_TmnCode", _vnpaySettings.TmnCode);
            vnpay.AddRequestData("vnp_Amount", ((int)(amount * 100)).ToString());
            vnpay.AddRequestData("vnp_CurrCode", "VND");
            vnpay.AddRequestData("vnp_TxnRef", paymentId.ToString());
            vnpay.AddRequestData("vnp_OrderInfo", orderInfo);
            vnpay.AddRequestData("vnp_Locale", "vn");
            vnpay.AddRequestData("vnp_ReturnUrl", _vnpaySettings.ReturnUrl);
            vnpay.AddRequestData("vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss"));

            var paymentUrl = vnpay.CreateRequestUrl(_vnpaySettings.VnpUrl, _vnpaySettings.HashSecret);
            return paymentUrl;
        }

        public bool VerifyPaymentResponse(IQueryCollection vnpayData)
        {
            var vnpay = new VnPayLibrary();
            foreach (var (key, value) in vnpayData)
            {
                vnpay.AddResponseData(key, value);
            }
            return vnpay.ValidateSignature(_vnpaySettings.HashSecret);
        }
    }

}
