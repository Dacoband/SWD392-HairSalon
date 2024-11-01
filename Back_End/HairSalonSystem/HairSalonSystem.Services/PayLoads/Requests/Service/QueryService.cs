using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Requests.Service
{
    public class QueryService
    {
        public string? ServiceName { get; set; }
        public int? Type {  get; set; }
        public float? MaxPrice {  get; set; }
        public bool? DelFig {  get; set; }
        public int? pageIndex {  get; set; }
        public int? pageSize { get; set; }
    }
}
