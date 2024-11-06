using HairSalonSystem.BusinessObject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.Interfaces
{
    public interface IAuthService
    {
<<<<<<< HEAD
        Task<string> GenerateJwtToken(Account account,Guid? actorId);
        Task<(Account, Guid?)> Authenticate(string email, string password);
=======
        Task<string> GenerateJwtToken(Account account,Guid? actorId, Guid? branchId);
        Task<(Account, Guid?, Guid?)> Authenticate(string email, string password);
>>>>>>> Thaiyud
    }
}
