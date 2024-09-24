using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.BusinessObject;
using HairSalonSystem.DAOs.Interface;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.DAOs.Implement
{
    public class AccountDAO : IAccountDAO
    {
        private readonly IMongoCollection<Account> _accounts;

        public AccountDAO(HairSalonContext context)
        {
            _accounts = context.Accounts;  // Assuming Accounts collection is set up in the context
        }

        public async Task CreateAccount(Account account)
        {
            await _accounts.InsertOneAsync(account);
        }

        public async Task<Account> GetAccountById(Guid id)
        {
            return await _accounts.Find(a => a.AccountId == id).FirstOrDefaultAsync();
        }

        public async Task<List<Account>> GetAllAccounts()
        {
            return await _accounts.Find(_ => true).ToListAsync();
        }

        public async Task UpdateAccount(Guid id, Account account)
        {
            await _accounts.ReplaceOneAsync(a => a.AccountId == id, account);
        }

        public async Task DeleteAccount(Guid id)
        {
            await _accounts.DeleteOneAsync(a => a.AccountId == id);
        }
        public async Task<Account> GetAccountByEmail(string email)
        {
            return await _accounts.Find(a => a.Email == email).FirstOrDefaultAsync();
        }
        public async Task<string> GetEmailByAccountId(Guid accountId)
        {
            var account = await _accounts.Find(a => a.AccountId == accountId).FirstOrDefaultAsync();
            return account?.Email;
        }
    }
}
