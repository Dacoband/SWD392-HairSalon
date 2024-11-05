using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Requests.Salary
{
    public class CreateSalaryModel
    {
        public Guid StylistId { get; set; }
        public float BaseSalary { get; set; }
        public float TotalEarning { get; set; }
        public DateTime PaymentDate { get; set; }
         

    }
}
