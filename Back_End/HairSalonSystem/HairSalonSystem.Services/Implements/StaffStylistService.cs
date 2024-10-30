using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Interface;
using HairSalonSystem.Services.Constant;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.PayLoads.Requests.StaffStylists;
using HairSalonSystem.Services.PayLoads.Responses.StaffStylists;
using HairSalonSystem.Services.Util;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace HairSalonSystem.Services.Implements
{
    public class StaffStylistService : IStaffStylistService
    {
        private readonly IStaffStylistRepository _staffStylistRepository;
        private readonly IAccountRepository _accountRepository;

        public StaffStylistService(IStaffStylistRepository staffStylistRepository, IAccountRepository accountRepository)
        {
            _staffStylistRepository = staffStylistRepository;
            _accountRepository = accountRepository;
        }

        public async Task<CreateStaffStylistResponse> CreateStaffStylistAsync(CreateStaffStylistRequest request, HttpContext httpContext)
        {
            var roleName = UserUtil.GetRoleName(httpContext);
            if (roleName != Enums.RoleEnums.SL.ToString() && roleName != Enums.RoleEnums.SA.ToString())
                return new CreateStaffStylistResponse { Message = MessageConstant.StaffStylistMessage.NotRights };
            var account = new Account
            {
                AccountId = Guid.NewGuid(),
                Email = request.Email,
                Password = PasswordUtil.HashPassword(request.Password),
                RoleName = Enums.RoleEnums.SL.ToString(),
                InsDate = TimeUtils.GetCurrentSEATime(),
                UpdDate = TimeUtils.GetCurrentSEATime(),
                DelFlg = true
            };
            await _accountRepository.AddAccount(account);
            var staffStylist = new StaffStylist
            {
                StaffStylistId = Guid.NewGuid(),
                AccountId = account.AccountId,
                BranchID = request.BranchId,
                StaffStylistName = request.StaffStylistName,
                DateOfBirth = request.DateOfBirth,
                PhoneNumber = request.PhoneNumber,
                Address = request.Address,
                AvatarImage = request.AvatarImage,
                InsDate = TimeUtils.GetCurrentSEATime(),
                UpdDate = TimeUtils.GetCurrentSEATime(),
                DelFlg = true
            };

            await _staffStylistRepository.CreateStaffStylist(staffStylist);

            return new CreateStaffStylistResponse
            {
                StaffStylistId = staffStylist.StaffStylistId,
                Message = MessageConstant.StaffStylistMessage.StaffStylistCreated
            };
        }

        public async Task<StaffStylistResponse> GetStaffStylistByIdAsync(Guid id)
        {
            var staffStylist = await _staffStylistRepository.GetStaffStylistById(id);
            if (staffStylist == null)
                throw new KeyNotFoundException(MessageConstant.StaffStylistMessage.StaffStylistNotFound);

            return new StaffStylistResponse
            {
                StaffStylistId = staffStylist.StaffStylistId,
                StaffStylistName = staffStylist.StaffStylistName,
                DateOfBirth = staffStylist.DateOfBirth,
                PhoneNumber = staffStylist.PhoneNumber,
                Address = staffStylist.Address,
                AvatarImage = staffStylist.AvatarImage
            };
        }
        public async Task<StaffStylistResponse> GetStaffStylistByAccountIdAsync(Guid accountId)
        {
            var staffStylist = await _staffStylistRepository.GetStaffStylistByAccountId(accountId);
            if (staffStylist == null)
                throw new KeyNotFoundException(MessageConstant.StaffStylistMessage.StaffStylistNotFound);

            return new StaffStylistResponse
            {
                StaffStylistId = staffStylist.StaffStylistId,
                StaffStylistName = staffStylist.StaffStylistName,
                DateOfBirth = staffStylist.DateOfBirth,
                PhoneNumber = staffStylist.PhoneNumber,
                Address = staffStylist.Address,
                AvatarImage = staffStylist.AvatarImage
            };

        }
        public async Task<List<StaffStylistResponse>> GetAllStaffStylistsAsync()
        {
            var staffStylists = await _staffStylistRepository.GetAllStaffStylists();
            var responseList = new List<StaffStylistResponse>();

            foreach (var stylist in staffStylists)
            {
                responseList.Add(new StaffStylistResponse
                {
                    StaffStylistId = stylist.StaffStylistId,
                    StaffStylistName = stylist.StaffStylistName,
                    DateOfBirth = stylist.DateOfBirth,
                    PhoneNumber = stylist.PhoneNumber,
                    Address = stylist.Address,
                    AvatarImage = stylist.AvatarImage
                });
            }

            return responseList;
        }

        public async Task UpdateStaffStylistAsync(Guid id, UpdateStaffStylistRequest request)
        {
            var staffStylist = await _staffStylistRepository.GetStaffStylistById(id);
            if (staffStylist == null)
                throw new KeyNotFoundException(MessageConstant.StaffStylistMessage.StaffStylistNotFound);

            staffStylist.StaffStylistName = request.StaffStylistName;
            staffStylist.DateOfBirth = request.DateOfBirth;
            staffStylist.PhoneNumber = request.PhoneNumber;
            staffStylist.Address = request.Address;
            staffStylist.AvatarImage = request.AvatarImage;
            staffStylist.UpdDate = TimeUtils.GetCurrentSEATime();

            await _staffStylistRepository.UpdateStaffStylist(id, staffStylist);
        }
   
        public async Task DeleteStaffStylistAsync(Guid id)
        {
            var staffStylist = await _staffStylistRepository.GetStaffStylistById(id);
            if (staffStylist == null)
                throw new KeyNotFoundException(MessageConstant.StaffStylistMessage.StaffStylistNotFound);

            await _staffStylistRepository.DeleteStaffStylist(id);
        }

        public async Task<List<StaffStylistResponse>> GetStaffStylistsByBranchIdAsync(Guid branchId)
        {
            var staffStylists = await _staffStylistRepository.GetStaffStylistByBranchId(branchId);
            var responseList = new List<StaffStylistResponse>();

            foreach (var stylist in staffStylists)
            {
                responseList.Add(new StaffStylistResponse
                {
                    StaffStylistId = stylist.StaffStylistId,
                    StaffStylistName = stylist.StaffStylistName,
                    DateOfBirth = stylist.DateOfBirth,
                    PhoneNumber = stylist.PhoneNumber,
                    Address = stylist.Address,
                    AvatarImage = stylist.AvatarImage
                });
            }

            return responseList;
        }

       
    }
}
