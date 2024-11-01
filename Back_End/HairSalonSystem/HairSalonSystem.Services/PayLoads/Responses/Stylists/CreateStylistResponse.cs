using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Responses.Stylists
{
    public class CreateStylistResponse
    {
        public Guid StylistId { get; set; }
        public string Message { get; set; }
    }
}
