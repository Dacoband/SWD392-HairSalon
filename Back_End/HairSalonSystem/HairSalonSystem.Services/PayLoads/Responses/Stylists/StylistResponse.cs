using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Responses.Stylists
{
    public class StylistResponse
    {
        public Guid BranchId { get; set; }
        public Guid StylistId { get; set; }
        public string StylistName { get; set; }
        public double AverageRating { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string AvatarImage { get; set; }
        public DateTime InsDate { get; set; }
        public DateTime UpdDate { get; set; }
    }
}
