using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Interface;
using HairSalonSystem.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.Implements
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountRepository;

        public AccountService(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }

        public async Task<Account> GetAccountById(Guid id)
        {
            return await _accountRepository.GetAccountById(id);
        }

        public async Task<List<Account>> GetAllAccounts()
        {
            return await _accountRepository.GetAllAccounts();
        }

        public async Task AddAccount(Account account)
        {
            
            await _accountRepository.AddAccount(account);
        }

        public async Task UpdateAccount(Account account)
        {
            
            await _accountRepository.UpdateAccount(account);
        }

        public async Task RemoveAccount(Guid id)
        {
            
            await _accountRepository.RemoveAccount(id);
        }
        private bool VerifyPassword(string storedPassword, string providedPassword)
        {
            // So sánh mật khẩu
            return storedPassword == providedPassword;
        }
        public async Task<Account> Authenticate(string email, string password)
        {
            var account = await _accountRepository.GetAccountByEmail(email);

            if (account == null || !VerifyPassword(account.Password, password))
            {
                return null;
            }

            return account;
        }
    }
}
