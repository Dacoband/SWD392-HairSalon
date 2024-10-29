using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.Enums
{
    public enum EnumStatus : int
    {
        Pending = 0,  // Appointment is scheduled but not yet completed
        Completed = 1,  // Appointment has been completed
        Canceled = 2  // Appointment was canceled
    }
}
