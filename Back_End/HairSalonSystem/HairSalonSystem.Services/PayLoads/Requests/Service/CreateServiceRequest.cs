using Microsoft.AspNetCore.Http;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Requests.Service
{
    public class CreateServiceRequest
    {
        [Required(ErrorMessage = "Bạn phải nhập tên dịch vụ")]
        [StringLength(100,ErrorMessage ="Tên dịch vụ không được quá 100 ký tự")]
        public string ServiceName { get; set; }
        [Range(1,3,ErrorMessage ="Dịch vụ phải thuộc kiểu 1, 2 hoặc 3")]
        //1 thuong - 2 combo
        [Required(ErrorMessage = "Bạn phải nhập loại dịch vụ")]

        public int Type { get; set; }
        [Range(10000, double.MaxValue, ErrorMessage = "Giá dịch vụ phải lớn hơn 10.0000")]
        [Required(ErrorMessage = "Bạn phải nhập giá dịch vụ")]

        public float Price { get; set; }

        public string? Description { get; set; }
        [Required(ErrorMessage = "Bạn phải nhập thời gian thực hiện dịch vụ")]

        [Range(10,480,ErrorMessage ="Thời gian thực hiện dịch vụ phải trong khoảng 10 - 480 phút")]
        public int Duration { get; set; } // minutes
        [Required(ErrorMessage = "Bạn phải chọn ảnh dịch vụ")]

        public IFormFile AvatarImage { get; set; }

        public DateTime InsDate = DateTime.Now;

        public bool DelFlg { get; set; }
    }
}
