using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Interface;
using HairSalonSystem.Services.Constant;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.PayLoads.Requests.Members;
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
    public class MemberService : IMemberService
    {
        private readonly IMemberRepository _memberRepository;
        private readonly IAccountRepository _accountRepository;


        public MemberService(IMemberRepository memberRepository)
        {
            _memberRepository = memberRepository;
        }

        public async Task<Member> GetMemberById(Guid id)
        {
            return await _memberRepository.GetMemberById(id);
        }

        public async Task<List<Member>> GetAllMembers()
        {
            return await _memberRepository.GetAllMembers();
        }

        public async Task AddMember(Member member)
        {
            // Additional business logic can be added here if needed
            await _memberRepository.AddMember(member);
        }

        public async Task<ActionResult> UpdateMember(Guid id, UpdateMemberRequest memberRequest, HttpContext httpContext)
        {
            var RoleName = UserUtil.GetRoleName(httpContext);
            Guid accountIdFromToken = UserUtil.GetAccountId(httpContext);

            // Kiểm tra RoleName có hợp lệ không
            if (RoleName != "SA" && RoleName != "SM" && RoleName != "SL" && RoleName != "MB" || string.IsNullOrEmpty(RoleName))
            {
                return new ObjectResult(MessageConstant.MemberMessage.MemberNotRightsUpdate)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }

            var existingAccount = await _accountRepository.GetAccountById(accountIdFromToken);
            if (existingAccount == null)
            {
                return new ObjectResult(MessageConstant.LoginMessage.NotFoundAccount)
                {
                    StatusCode = StatusCodes.Status400BadRequest
                };
            }

            var existingMember = await _memberRepository.GetMemberById(id);
            if (existingMember == null)
            {
                return new ObjectResult(MessageConstant.MemberMessage.MemberNotFound)
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }

            // Cập nhật các thông tin của member và account
            existingMember.MemberName = memberRequest.MemberName;
            existingAccount.Email = memberRequest.Email;
            existingMember.PhoneNumber = memberRequest.PhoneNumber;
            existingMember.Address = memberRequest.Address;
            existingMember.DateOfBirth = memberRequest.DateOfBirth;
            existingMember.AvatarImage = memberRequest.AvatarImage;
            existingMember.UpdDate = TimeUtils.GetCurrentSEATime();

            // Gọi service để cập nhật
            await _memberRepository.UpdateMember(existingMember);
            await _accountRepository.UpdateAccount(existingAccount);

            // Trả về kết quả thành công
            return new ObjectResult(MessageConstant.MemberMessage.MemberUpdated);  // HTTP 204 No Content khi update thành công
        }

        public async Task RemoveMember(Guid id)
        {
            // Additional business logic can be added here if needed
            await _memberRepository.RemoveMember(id);
        }
    }
}
