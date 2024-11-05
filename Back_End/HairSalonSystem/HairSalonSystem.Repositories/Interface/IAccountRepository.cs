using HairSalonSystem.BusinessObject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Repositories.Interface
{
    public interface IAccountRepository
    {
        Task<Account> GetAccountById(Guid? id);
        Task<List<Account>> GetAllAccounts();
        Task AddAccount(Account account);
        Task UpdateAccount(Account account);
        Task UpdateEmailAsync(Guid? accountId, string newEmail);
        Task RemoveAccount(Guid id);
        Task<Account> GetAccountByEmail(string email);
        Task<string> GetEmailByAccountId(Guid accountId);
        Task<Guid> GetStylistId(Guid accountId);
        Task<Guid> GetStaffStylistId(Guid accountId);
        Task<Guid> GetStaffManagerId(Guid accountId);
        Task<Guid> GetMemberId(Guid accountId);
    }
}
