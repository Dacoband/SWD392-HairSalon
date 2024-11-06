using HairSalonSystem.BusinessObject;
using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.DAOs.Interface;
using HairSalonSystem.DAOs.Interfaces;
using HairSalonSystem.Repositories.Interface;
using MongoDB.Driver;
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
        private readonly IMongoCollection<Stylist> _Stylists;
        private readonly IMongoCollection<StaffStylist> _staffStylists;
        private readonly IMongoCollection<StaffManager> _staffManagers;
        private readonly IMongoCollection<Member> _members;
<<<<<<< HEAD
=======
        private readonly IMongoCollection<Branch> _branches;
>>>>>>> Thaiyud

        public AccountRepository(IAccountDAO accountDAO, HairSalonContext context)
        {
            _accountDAO = accountDAO;
            _Stylists = context.Stylists;
            _staffStylists = context.StaffStylists;
            _staffManagers = context.StaffManagers;
            _members = context.Members;
<<<<<<< HEAD
=======
            _branches = context.Branchs;
>>>>>>> Thaiyud
        }

        public async Task<Account> GetAccountById(Guid? id)
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

        public async Task UpdateEmailAsync(Guid? accountId, string newEmail)
        {
            await _accountDAO.UpdateEmailAsync(accountId, newEmail);
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

        public async Task<Guid> GetStylistId(Guid accountId)
        {
            var stylist = await _Stylists.Find(n => n.AccountId == accountId).FirstOrDefaultAsync();
            return stylist.StylistId;
        }

        public async Task<Guid> GetStaffStylistId(Guid accountId)
        {
            var staffStylist = await _staffStylists.Find(n => n.AccountId == accountId).FirstOrDefaultAsync();
<<<<<<< HEAD
            return staffStylist.StaffStylistId;
=======
            return staffStylist.StaffStylistId ;
>>>>>>> Thaiyud
        }

        public async Task<Guid> GetStaffManagerId(Guid accountId)
        {
            var staffManager = await _staffManagers.Find(n => n.AccountID == accountId).FirstOrDefaultAsync();
            return staffManager.StaffManagerID;
        }

        public async Task<Guid> GetMemberId(Guid accountId)
        {
            var member = await _members.Find(n => n.AccountId == accountId).FirstOrDefaultAsync();
            return member.MemberId;
        }
<<<<<<< HEAD
=======
        public async Task<Guid?> GetBranchIdByAccountId(Guid accountId)
        {
            var stylist = await _Stylists.Find(n => n.AccountId == accountId).FirstOrDefaultAsync();
            if (stylist != null)
            {
                return stylist.BranchID;
            }

            var staffManager = await _staffManagers.Find(n => n.AccountID == accountId).FirstOrDefaultAsync();
            if (staffManager != null)
            {
                return staffManager.BranchID;
            }

            var staffStylist = await _staffStylists.Find(n => n.AccountId == accountId).FirstOrDefaultAsync();
            if (staffStylist != null)
            {
                return staffStylist.BranchID;
            }

            return null;
        }
>>>>>>> Thaiyud
    }
}
