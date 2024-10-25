using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.WebUtilities;

namespace HairSalonSystem.Services.Util
{
    public class VnPayLibrary
    {
        private SortedList<string, string> _requestData = new SortedList<string, string>();
        private SortedList<string, string> _responseData = new SortedList<string, string>();

        // Add request data for VNPay
        public void AddRequestData(string key, string value)
        {
            if (!string.IsNullOrEmpty(value))
            {
                _requestData.Add(key, value);
            }
        }

        // Add response data for VNPay
        public void AddResponseData(string key, string value)
        {
            if (!string.IsNullOrEmpty(value))
            {
                _responseData.Add(key, value);
            }
        }

        // Generate the VNPay payment URL
        public string CreateRequestUrl(string baseUrl, string hashSecret)
        {
            var queryString = new StringBuilder();

            foreach (var kvp in _requestData)
            {
                queryString.Append($"{kvp.Key}={Uri.EscapeDataString(kvp.Value)}&");
            }

            var signData = queryString.ToString().TrimEnd('&');
            var vnp_SecureHash = HmacSha512(hashSecret, signData);
            var paymentUrl = $"{baseUrl}?{signData}&vnp_SecureHash={vnp_SecureHash}";

            return paymentUrl;
        }

        // Validate the response from VNPay using hash secret
        public bool ValidateSignature(string hashSecret)
        {
            var secureHash = _responseData["vnp_SecureHash"];
            _responseData.Remove("vnp_SecureHash");

            var data = new StringBuilder();
            foreach (var kvp in _responseData)
            {
                data.Append($"{kvp.Key}={Uri.EscapeDataString(kvp.Value)}&");
            }

            var signData = data.ToString().TrimEnd('&');
            var checkSignature = HmacSha512(hashSecret, signData);

            return secureHash.Equals(checkSignature, StringComparison.InvariantCultureIgnoreCase);
        }

        // HMAC SHA512 encryption
        private string HmacSha512(string key, string inputData)
        {
            using (var hmac = new HMACSHA512(Encoding.UTF8.GetBytes(key)))
            {
                var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(inputData));
                return BitConverter.ToString(hash).Replace("-", "").ToLower();
            }
        }
    }
}
