using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Implement;
using HairSalonSystem.Repositories.Interface;
using HairSalonSystem.Services.Constant;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.PayLoads.Requests.Stylists;
using HairSalonSystem.Services.PayLoads.Responses.StaffStylists;
using HairSalonSystem.Services.PayLoads.Responses.Stylists;
using HairSalonSystem.Services.Util;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.Implements
{
    public class StylistService : IStylistService
    {
        private readonly IStylistRepository _stylistRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly IFirebaseService _firebaseService;
        public StylistService(IStylistRepository stylistRepository, IAccountRepository accountRepository, IFirebaseService firebaseService)

        {
            _stylistRepository = stylistRepository;
            _accountRepository = accountRepository;
            _firebaseService = firebaseService;
        }

        public async Task<CreateStylistResponse> CreateStylistAsync(CreateStylistRequest request, HttpContext httpContext)
        {
            var roleName = UserUtil.GetRoleName(httpContext);
            var url = "";
            if (request.AvatarImage != null)
            {
                url = await _firebaseService.UploadFile(request.AvatarImage);

            }
            var account = new Account
            {
                AccountId = Guid.NewGuid(),
                Email = request.Email,
                Password = PasswordUtil.HashPassword(request.Password),
                RoleName = Enums.RoleEnums.SL.ToString(),
                InsDate = DateTime.Now,
                UpdDate = DateTime.Now,
                DelFlg = true
            };
            await _accountRepository.AddAccount(account);
            var stylist = new Stylist
            {
                StylistId = Guid.NewGuid(),
                AccountId = account.AccountId,
                StaffStylistId = request.StaffStylistId,
                BranchID = request.BranchID,
                AverageRating = request.AverageRating,
                StylistName = request.StylistName,
                PhoneNumber = request.PhoneNumber,
                Address = request.Address,
                AvatarImage = url,
                BaseSalary = 5000000,
                InsDate = DateTime.Now,
                UpdDate = DateTime.Now,
                DelFlg = true
            };

            await _stylistRepository.CreateStylist(stylist);

            return new CreateStylistResponse
            {
                StylistId = stylist.StylistId,
                Message = MessageConstant.StylistMessage.StylistCreated
            };
        }

        public async Task<List<StylistResponse>> GetAllStylistsAsync()
        {
            var stylists = await _stylistRepository.GetAllStylist();
            var responseList = new List<StylistResponse>();

            foreach (var stylist in stylists)
            {
                responseList.Add(new StylistResponse
                {
                    StylistId = stylist.StylistId,
                    StylistName = stylist.StylistName,
                    AverageRating = stylist.AverageRating,
                    BranchId = stylist.BranchID,
                    PhoneNumber = stylist.PhoneNumber,
                    Address = stylist.Address,
                    AvatarImage = stylist.AvatarImage,
                });
            }

            return responseList;
        }

        public async Task<StylistResponse> GetStylistByIdAsync(Guid id)
        {
            var stylist = await _stylistRepository.GetStylistById(id);
            if (stylist == null)
                throw new KeyNotFoundException(MessageConstant.StylistMessage.StylistNotFound);

            return new StylistResponse
            {
                StylistId = stylist.StylistId,
                StylistName = stylist.StylistName,
                AverageRating = stylist.AverageRating,
                BranchId = stylist.BranchID,
                PhoneNumber = stylist.PhoneNumber,
                Address = stylist.Address,
                AvatarImage = stylist.AvatarImage,
            };
        }

        public async Task<UpdateStylistResponse> UpdateStylistAsync(Guid id, UpdateStylistRequest request, HttpContext httpContext)
        {
            var roleName = UserUtil.GetRoleName(httpContext);
            //var accountId = UserUtil.GetAccountId(httpContext);

            var stylist = await _stylistRepository.GetStylistById(id);
            //var existingAccount = await _accountRepository.GetAccountById(accountId);
            if (stylist == null)
                throw new KeyNotFoundException(MessageConstant.StylistMessage.StylistNotFound);
            var url = "";
            if (request.AvatarImage != null)
            {
                url = await _firebaseService.UploadFile(request.AvatarImage);
            }
            stylist.StaffStylistId = request.StaffStylistId ?? stylist.StaffStylistId;
            stylist.BranchID = request.BranchID ?? stylist.BranchID;
            stylist.StylistName = request.StylistName ?? stylist.StylistName;
            stylist.PhoneNumber = request.PhoneNumber ?? stylist.PhoneNumber;
            stylist.Address = request.Address ?? stylist.Address;
            stylist.AvatarImage = request.AvatarImage != null ? url : stylist.AvatarImage; ;

            await _stylistRepository.UpdateStylist(id, stylist);

            return new UpdateStylistResponse
            {
                StylistId = stylist.StylistId,
                Message = MessageConstant.StylistMessage.StylistUpdated
            };
        }

        public async Task DeleteStylistAsync(Guid id, HttpContext httpContext)
        {
            var roleName = UserUtil.GetRoleName(httpContext);

            if (roleName != Enums.RoleEnums.SA.ToString() && roleName != Enums.RoleEnums.SM.ToString())
            {
                throw new UnauthorizedAccessException(MessageConstant.StylistMessage.StylistNotRightsDelete);
            }
            var stylist = await _stylistRepository.GetStylistById(id);
            if (stylist == null)
                throw new KeyNotFoundException(MessageConstant.StylistMessage.StylistNotFound);

            await _stylistRepository.DeleteStylist(id);
        }

        public async Task<List<StylistResponse>> GetStylistByBranchIdAsync(Guid branchId)
        {
            var stylists = await _stylistRepository.GetStylistByBranchId(branchId);
            if (stylists == null || !stylists.Any())
                throw new KeyNotFoundException(MessageConstant.StylistMessage.StylistNotFound);
            var responseList = new List<StylistResponse>();

            foreach (var stylist in stylists)
            {
                responseList.Add(new StylistResponse
                {
                    StylistId = stylist.StylistId,
                    StylistName = stylist.StylistName,
                    AverageRating = stylist.AverageRating,
                    BranchId = stylist.BranchID,
                    PhoneNumber = stylist.PhoneNumber,
                    Address = stylist.Address,
                    AvatarImage = stylist.AvatarImage,
                });
            }

            return responseList;
        }
        public async Task<List<StylistResponse>> GetStylistByStaffStylistAsync(Guid staffStylistId)
        {
            var stylists = await _stylistRepository.GetStylistByStaffStylist(staffStylistId);
            if (stylists == null || !stylists.Any())
                throw new KeyNotFoundException(MessageConstant.StylistMessage.StylistNotFound);

            var stylistResponses = new List<StylistResponse>();

            foreach (var stylist in stylists)
            {
                stylistResponses.Add(new StylistResponse
                {
                    StylistId = stylist.StylistId,
                    StylistName = stylist.StylistName,
                    BranchId = stylist.BranchID,
                    AverageRating = stylist.AverageRating,
                    PhoneNumber = stylist.PhoneNumber,
                    Address = stylist.Address,
                    AvatarImage = stylist.AvatarImage
                });
            }

            return stylistResponses;
        }
        public async Task<StylistResponse> GetRandomStylistByBranchIdAsync(Guid branchId)
        {
            var stylist = await _stylistRepository.GetRandomStylistByBranchId(branchId);
            if (stylist == null)
                throw new KeyNotFoundException(MessageConstant.StylistMessage.StylistNotFound);

            return new StylistResponse
            {
                StylistId = stylist.StylistId,
                StylistName = stylist.StylistName,
                AverageRating = stylist.AverageRating,
                BranchId = stylist.BranchID,
                PhoneNumber = stylist.PhoneNumber,
                Address = stylist.Address,
                AvatarImage = stylist.AvatarImage,
            };
        }

    }
}
