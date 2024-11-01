using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Interface;
using HairSalonSystem.Services.Constant;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.PayLoads.Requests.StaffManagers;
using HairSalonSystem.Services.PayLoads.Responses.StaffManagers;

using HairSalonSystem.Services.Util;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HairSalonSystem.Services.Implements
{
    public class StaffManagerService : IStaffManagerService
    {
        private readonly IStaffManagerRepository _staffManagerRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly IBranchRespository _branchRespository;

        public StaffManagerService(IStaffManagerRepository staffManagerRepository, IAccountRepository accountRepository,IBranchRespository branchRespository)
        {
            _staffManagerRepository = staffManagerRepository;
            _accountRepository = accountRepository;
            _branchRespository = branchRespository;
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
            var account = new Account()
            {
                AccountId = Guid.NewGuid(),
                Email = staffManager.Email,
                Password = PasswordUtil.HashPassword(staffManager.Password),
                RoleName = Enums.RoleEnums.SM.ToString(),
                InsDate = TimeUtils.GetCurrentSEATime(),
                UpdDate = TimeUtils.GetCurrentSEATime(),
                DelFlg = true
            };
             await _accountRepository.AddAccount(account);

            var staffmanager = new StaffManager()
            {
                StaffManagerID = Guid.NewGuid(),
                AccountID = account.AccountId,
                BranchID = staffManager.BranchID,
                StaffManagerName = staffManager.StaffManagerName,
                DateOfBirth = DateTime.Now,
                PhoneNumber = staffManager.PhoneNumber,
                Address = staffManager.Address,
                AvatarImage = staffManager.AvatarImage,
                InsDate = TimeUtils.GetCurrentSEATime(),
                UpdDate =TimeUtils.GetCurrentSEATime(),
                DelFlg = true 
                };
            var brach = await _branchRespository.GetBranchById(staffManager.BranchID);
            if (brach == null)
            {
                return new ObjectResult(MessageConstant.BranchMessage.BranchNotFound)
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }



            await _staffManagerRepository.AddStaffManager(staffmanager);

            var response = new CreateNewStaffManagerResponse()
            {
                BranchID = staffManager.BranchID,
                Email = account.Email,
                StaffManagerName = staffmanager.StaffManagerName,
                Address = staffManager.Address,
                DateOfBirth = staffmanager.DateOfBirth,
                PhoneNumber = staffmanager.PhoneNumber,
                AvatarImage = staffmanager.AvatarImage
            };
                      return new ObjectResult(response);
        }

        public async Task<ActionResult> UpdateStaffManager(Guid id, UpdateStaffManagerRequest staffManagerRequest, HttpContext httpContext)
        {
            var RoleName = UserUtil.GetRoleName(httpContext);
            Guid? accountIdFromToken = UserUtil.GetAccountId(httpContext);
           
            
            if (RoleName != "SA" && RoleName != "SM" && string.IsNullOrEmpty(RoleName))
            {
                throw new BadHttpRequestException(MessageConstant.StaffManagerMessage.StaffManagerNotRightsUpdate);
            }
            var existingStaffManager = await _staffManagerRepository.GetStaffManagerById(id);

            var existingAccount = await _accountRepository.GetAccountById(accountIdFromToken);
            if (existingAccount == null)
            {
                throw new BadHttpRequestException(MessageConstant.LoginMessage.NotFoundAccount);
            }

            
            if (existingStaffManager == null)
            {
                throw new BadHttpRequestException(MessageConstant.StaffManagerMessage.StaffManagerNotFound);
            }

            // Cập nhật thông tin StaffManager và Account
            existingStaffManager.StaffManagerName = staffManagerRequest.StaffManagerName ?? existingStaffManager.StaffManagerName;
            existingAccount.Email = staffManagerRequest.Email ?? existingAccount.Email;
            existingStaffManager.PhoneNumber = staffManagerRequest.PhoneNumber ?? existingStaffManager.PhoneNumber;
            existingStaffManager.Address = staffManagerRequest.Address ?? existingStaffManager.Address;
            existingStaffManager.DateOfBirth = staffManagerRequest.DateOfBirth != DateTime.MinValue ? staffManagerRequest.DateOfBirth : existingStaffManager.DateOfBirth;
            existingStaffManager.AvatarImage = staffManagerRequest.AvatarImage ?? existingStaffManager.AvatarImage;
            existingStaffManager.UpdDate = TimeUtils.GetCurrentSEATime();

             await _staffManagerRepository.UpdateStaffManager(existingStaffManager);
            await _accountRepository.UpdateEmailAsync(accountIdFromToken, existingAccount.Email);
            var response = new UpdateStaffManagerResponse()
            {
                BranchID = existingStaffManager.BranchID,
                Email = existingAccount.Email,
                StaffManagerName = existingStaffManager.StaffManagerName,
                DateOfBirth = existingStaffManager.DateOfBirth,
                PhoneNumber = existingStaffManager.PhoneNumber,
                Address = existingStaffManager.Address,
                AvatarImage = existingStaffManager.AvatarImage,
                
            };
            return new ObjectResult(MessageConstant.StaffManagerMessage.StaffManagerUpdatedSuccessfully)
            {
                StatusCode = StatusCodes.Status200OK
            } ;
        }

        public async Task RemoveStaffManager(Guid id)
        {
            await _staffManagerRepository.RemoveStaffManager(id);
        } 
    }
}
