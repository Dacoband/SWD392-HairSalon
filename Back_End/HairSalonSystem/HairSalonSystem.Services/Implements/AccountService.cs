using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Interface;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.Constant;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

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
            var account = await _accountRepository.GetAccountById(id);
            if (account == null)
            {
                throw new Exception(MessageConstant.AccountMessage.AccountNotFound);
            }
            return account;
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
        public async Task<Account> GetAccountByEmail(string email)
        {
            return await _accountRepository.GetAccountByEmail(email);
        }
        public async Task<string> GetEmailByAccountId(Guid accountId)
        {
            return await _accountRepository.GetEmailByAccountId(accountId);
        }
        public async Task<bool> IsEmailExist(string email)
        {
            var account = await _accountRepository.GetAccountByEmail(email);
            return account != null;
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
