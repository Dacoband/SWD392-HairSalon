using HairSalonSystem.BusinessObject.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.Interfaces
{
    public interface IAccountService
    {
        Task<Account> GetAccountById(Guid id);
        Task<List<Account>> GetAllAccounts();
        Task AddAccount(Account account);
        Task UpdateAccount(Account account);
        Task RemoveAccount(Guid id);
        Task<Account> GetAccountByEmail(string email);
        Task<string> GetEmailByAccountId(Guid accountId);
        Task<bool> IsEmailExist(string email);
    }
}
