using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.DAOs.Interface;
using HairSalonSystem.Repositories.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Repositories.Implement
{
    public class AccountRepository : IAccountRepository
    {
        private readonly IAccountDAO _accountDAO;

        public AccountRepository(IAccountDAO accountDAO)
        {
            _accountDAO = accountDAO;
        }

        public async Task<Account> GetAccountById(Guid id)
        {
            return await _accountDAO.GetAccountById(id);
        }

        public async Task<List<Account>> GetAllAccounts()
        {
            return await _accountDAO.GetAllAccounts();
        }

        public async Task AddAccount(Account account)
        {
            await _accountDAO.CreateAccount(account);
        }

        public async Task UpdateAccount(Account account)
        {
            await _accountDAO.UpdateAccount(account.AccountId, account);
        }

        public async Task RemoveAccount(Guid id)
        {
            await _accountDAO.DeleteAccount(id);
        }
        public async Task<Account> GetAccountByEmail(string email)
        {
            return await _accountDAO.GetAccountByEmail(email);
        }
        public async Task<string> GetEmailByAccountId(Guid accountId)
        {
            return await _accountDAO.GetEmailByAccountId(accountId);
        }

    }
}
