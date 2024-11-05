using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Requests.Cancellation
{
    public class Pagination
    {
        public int? pageIndex { get; set; }
        public int? pageSize { get; set; }
    }
}
