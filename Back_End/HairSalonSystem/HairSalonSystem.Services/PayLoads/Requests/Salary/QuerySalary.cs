using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Requests.Salary
{
    public class QuerySalary
    {
        public Guid? StylistId { get; set; }
        public double? BaseSalary {  get; set; }

        public double? CommissionPercentage { get; set; }
        public double? TotalSalary { get; set; }
        public DateTime? PaymentDate { get; set; }
        public bool? DelFlg { get; set; } 
        public int? pageIndex { get; set; }
        public int? pageSize { get; set; }

    }
}
