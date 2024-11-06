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
        Task<string> GenerateJwtToken(Account account,Guid? actorId);
        Task<(Account, Guid?)> Authenticate(string email, string password);
    }
}
