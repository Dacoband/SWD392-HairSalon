using HairSalonSystem.BusinessObject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Repositories.Interface
{
    public interface IAccountDAO
    {
        Task<Account> GetAccountById(Guid id);
        Task<List<Account>> GetAllAccounts();
        Task CreateAccount(Account account);
        Task UpdateAccount(Guid id, Account account);
        Task DeleteAccount(Guid id);
    }
}
