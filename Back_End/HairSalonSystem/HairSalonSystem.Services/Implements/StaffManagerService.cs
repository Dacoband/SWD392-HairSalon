using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Interface;
using HairSalonSystem.Services.Constant;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.PayLoads.Requests.StaffManagers;
using HairSalonSystem.Services.Util;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.Implements
{
    public class StaffManagerService : IStaffManagerService
    {
        private readonly IStaffManagerRepository _staffManagerRepository;
        private readonly IAccountRepository _accountRepository;

        public StaffManagerService(IStaffManagerRepository staffManagerRepository, IAccountRepository accountRepository)
        {
            _staffManagerRepository = staffManagerRepository;
            _accountRepository = accountRepository;
        }

        public async Task<StaffManager> GetStaffManagerById(Guid id)
        {
            return await _staffManagerRepository.GetStaffManagerById(id);
        }

        public async Task<List<StaffManager>> GetAllStaffManagers()
        {
            return await _staffManagerRepository.GetAllStaffManagers();
        }

        public async Task<ActionResult> AddStaffManager(CreateNewStaffManagerRequest staffManager,HttpContext httpContext)
        {
            var accountID = UserUtil.GetAccountId(httpContext);
            if (accountID == null)
            {
                return new ObjectResult(MessageConstant.BranchMessage.NotRights)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }
            var roleName = UserUtil.GetRoleName(httpContext);
            if (roleName != "SA")
            {
                return new ObjectResult(MessageConstant.BranchMessage.NotRights)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }

            var staffmanager = new StaffManager()
            {
                AccountID = Guid.NewGuid(),
                BranchID = staffManager.BranchID,
                StaffManagerName = staffManager.StaffManagerName,
                DateOfBirth = DateTime.Now,
                PhoneNumber = staffManager.PhoneNumber,
                Address = staffManager.Address,
                AvatarImage = staffManager.AvatarImage,

                
                

                

            };
            await _staffManagerRepository.AddStaffManager(staffManager);
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateStaffManager(Guid id, UpdateStaffManagerRequest staffManagerRequest, HttpContext httpContext)
        {
            var RoleName = UserUtil.GetRoleName(httpContext);
            Guid? accountIdFromToken = UserUtil.GetAccountId(httpContext);

            // Kiểm tra RoleName hợp lệ
            if (RoleName != "SA" && RoleName != "SM" && RoleName != "SL" && string.IsNullOrEmpty(RoleName))
            {
                throw new BadHttpRequestException(MessageConstant.StaffManagerMessage.StaffManagerNotRightsUpdate);
            }

            var existingAccount = await _accountRepository.GetAccountById(accountIdFromToken);
            if (existingAccount == null)
            {
                throw new BadHttpRequestException(MessageConstant.LoginMessage.NotFoundAccount);
            }

            var existingStaffManager = await _staffManagerRepository.GetStaffManagerById(id);
            if (existingStaffManager == null)
            {
                throw new BadHttpRequestException(MessageConstant.StaffManagerMessage.StaffManagerNotFound);
            }

            // Cập nhật thông tin StaffManager và Account
            existingStaffManager.StaffManagerName = staffManagerRequest.StaffManagerName;
            existingAccount.Email = staffManagerRequest.Email;
            existingStaffManager.PhoneNumber = staffManagerRequest.PhoneNumber;
            existingStaffManager.Address = staffManagerRequest.Address;
            existingStaffManager.DateOfBirth = staffManagerRequest.DateOfBirth;
            existingStaffManager.AvatarImage = staffManagerRequest.AvatarImage;
            existingStaffManager.UpdDate = TimeUtils.GetCurrentSEATime();

            await _staffManagerRepository.UpdateStaffManager(existingStaffManager);
            await _accountRepository.UpdateEmailAsync(accountIdFromToken, existingAccount.Email);

            return true;
        }

        public async Task RemoveStaffManager(Guid id)
        {
            // Thêm logic nghiệp vụ nếu cần
            await _staffManagerRepository.RemoveStaffManager(id);
        }

        
    }
}
