using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.BusinessObject
{
    public class VNPaySettings
    {
        public string TmnCode { get; set; }
        public string HashSecret { get; set; }
        public string VnpUrl { get; set; }
        public string ReturnUrl { get; set; }
    }
}
