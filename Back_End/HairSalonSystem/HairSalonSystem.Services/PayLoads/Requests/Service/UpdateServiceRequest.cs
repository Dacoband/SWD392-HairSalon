using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Requests.Service
{
    public class UpdateServiceRequest
    {
        public string? ServiceName { get; set; }
        [Range(1, 3, ErrorMessage = "Dịch vụ phải thuộc kiểu 1, 2 hoặc 3")]
        public int? Type { get; set; }
        [Range(10000, double.MaxValue, ErrorMessage = "Giá dịch vụ phải lớn hơn 10.0000")]
        public float? Price { get; set; }
        public string? Description { get; set; }

        [Range(10, 480, ErrorMessage = "Thời gian thực hiện dịch vụ phải trong khoảng 10 - 480 phút")]
        public int? Duration { get; set; } 

        public IFormFile? AvatarImage { get; set; }

        public DateTime? UpdDate = DateTime.Now;
    }
}
