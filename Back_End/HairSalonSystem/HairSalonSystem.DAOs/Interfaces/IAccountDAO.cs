using HairSalonSystem.BusinessObject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.DAOs.Interface
{
    public interface IAccountDAO
    {
        Task CreateAccount(Account account);
        Task<Account> GetAccountById(Guid id);
        Task<List<Account>> GetAllAccounts();
        Task UpdateAccount(Guid id, Account account);
        Task DeleteAccount(Guid id);
        Task<Account> GetAccountByEmail(string email);
    }
}
