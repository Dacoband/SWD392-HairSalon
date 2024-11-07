using Amazon.Runtime.Internal;
using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Interface;
using HairSalonSystem.Services.Constant;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.PayLoads.Requests.StaffManagers;
using HairSalonSystem.Services.PayLoads.Responses.StaffManagers;

using HairSalonSystem.Services.Util;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Asn1.Ocsp;

namespace HairSalonSystem.Services.Implements
{
    public class StaffManagerService : IStaffManagerService
    {
        private readonly IStaffManagerRepository _staffManagerRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly IBranchRespository _branchRespository;
        private readonly IFirebaseService _firebaseService;

        public StaffManagerService(IStaffManagerRepository staffManagerRepository, IAccountRepository accountRepository,IBranchRespository branchRespository, IFirebaseService firebaseService)
        {
            _staffManagerRepository = staffManagerRepository;
            _accountRepository = accountRepository;
            _branchRespository = branchRespository;
            _firebaseService = firebaseService;
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
            var account = new Account()
            {
                AccountId = Guid.NewGuid(),
                Email = staffManager.Email,
                Password = PasswordUtil.HashPassword(staffManager.Password),
                RoleName = Enums.RoleEnums.SM.ToString(),
                InsDate = DateTime.Now,
                UpdDate = DateTime.Now,
                DelFlg = true
            };
             await _accountRepository.AddAccount(account);
            var url = await _firebaseService.UploadFile(staffManager.AvatarImage);
            var staffmanager = new StaffManager()
            {
                StaffManagerID = Guid.NewGuid(),
                AccountID = account.AccountId,
                BranchID = staffManager.BranchID,
                StaffManagerName = staffManager.StaffManagerName,
                DateOfBirth = DateTime.Now,
                PhoneNumber = staffManager.PhoneNumber,
                Address = staffManager.Address,
                AvatarImage = url,
                InsDate = DateTime.Now,
                UpdDate =DateTime.Now,
                DelFlg = true 
                };
            //var brach = await _branchRespository.GetBranchById(staffManager.BranchID);
            //if (brach == null)
            //{
            //    return new ObjectResult(MessageConstant.BranchMessage.BranchNotFound)
            //    {
            //        StatusCode = StatusCodes.Status404NotFound
            //    };
            //}

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
           // Guid? accountIdFromToken = UserUtil.GetAccountId(httpContext);
           
            
            if (RoleName != "SA" && RoleName != "SM" && string.IsNullOrEmpty(RoleName))
            {
                throw new BadHttpRequestException(MessageConstant.StaffManagerMessage.StaffManagerNotRightsUpdate);
            }
            var existingStaffManager = await _staffManagerRepository.GetStaffManagerById(id);

            //var existingAccount = await _accountRepository.GetAccountById(accountIdFromToken);
            //if (existingAccount == null)
            //{
            //    throw new BadHttpRequestException(MessageConstant.LoginMessage.NotFoundAccount);
            //}

            
            if (existingStaffManager == null)
            {
                throw new BadHttpRequestException(MessageConstant.StaffManagerMessage.StaffManagerNotFound);
            }
            var url = "";
            if (staffManagerRequest.AvatarImage != null)
            {
                url = await _firebaseService.UploadFile(staffManagerRequest.AvatarImage);

            }
            // Cập nhật thông tin StaffManager và Account
            existingStaffManager.StaffManagerName = staffManagerRequest.StaffManagerName ?? existingStaffManager.StaffManagerName;
            existingStaffManager.BranchID = staffManagerRequest.BranchID ?? existingStaffManager.BranchID;
            //existingAccount.Email = staffManagerRequest.Email ?? existingAccount.Email;
            existingStaffManager.PhoneNumber = staffManagerRequest.PhoneNumber ?? existingStaffManager.PhoneNumber;
            existingStaffManager.Address = staffManagerRequest.Address ?? existingStaffManager.Address;
            existingStaffManager.DateOfBirth = staffManagerRequest.DateOfBirth != DateTime.MinValue ? staffManagerRequest.DateOfBirth : existingStaffManager.DateOfBirth;
            existingStaffManager.AvatarImage = staffManagerRequest.AvatarImage != null ? url : existingStaffManager.AvatarImage;
            existingStaffManager.UpdDate = DateTime.Now;

             await _staffManagerRepository.UpdateStaffManager(existingStaffManager);
           // await _accountRepository.UpdateEmailAsync(accountIdFromToken, existingAccount.Email);
            var response = new UpdateStaffManagerResponse()
            {
                BranchID = existingStaffManager.BranchID,
                //Email = existingAccount.Email,
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
