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
        private readonly IFirebaseService _firebaseService;

        public MemberService(IMemberRepository memberRepository, IAccountRepository accountRepository, IFirebaseService firebaseService)
        {
            _memberRepository = memberRepository;
            _accountRepository = accountRepository;
            _firebaseService = firebaseService;
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
            await _memberRepository.AddMember(member);
        }

        public async Task<bool> UpdateMember(Guid id,UpdateMemberRequest memberRequest, HttpContext httpContext)
        {
            var RoleName = UserUtil.GetRoleName(httpContext);
            Guid? accountIdFromToken = UserUtil.GetAccountId(httpContext);

            if ( RoleName != "MB" || string.IsNullOrEmpty(RoleName))
            {
                throw new BadHttpRequestException(MessageConstant.MemberMessage.MemberNotRightsUpdate);

            }
            var existingAccount = await _accountRepository.GetAccountById(accountIdFromToken);
            if (existingAccount == null)
            {
                throw new BadHttpRequestException(MessageConstant.LoginMessage.NotFoundAccount);

            }
            var url = "";
            if (memberRequest.AvatarImage != null)
            {
                url = await _firebaseService.UploadFile(memberRequest.AvatarImage);

            }
            var existingMember = await _memberRepository.GetMemberById(id);
            if (existingMember == null)
            {
                throw new BadHttpRequestException(MessageConstant.MemberMessage.MemberNotFound);

            }


            existingMember.MemberName = memberRequest.MemberName ?? existingMember.MemberName;
            existingAccount.Email = memberRequest.Email ?? existingAccount.Email;
            existingMember.PhoneNumber = memberRequest.PhoneNumber ?? existingMember.PhoneNumber;
            existingMember.Address = memberRequest.Address ?? existingMember.Address;
            existingMember.DateOfBirth = memberRequest.DateOfBirth ?? existingMember.DateOfBirth;
            existingMember.AvatarImage = memberRequest.AvatarImage != null ? url : existingMember.AvatarImage;
            existingMember.UpdDate = DateTime.Now;


            await _memberRepository.UpdateMember(existingMember);
            await _accountRepository.UpdateEmailAsync(accountIdFromToken, existingAccount.Email);

            return true;
        }

        public async Task RemoveMember(Guid id)
        {
            // Additional business logic can be added here if needed
            await _memberRepository.RemoveMember(id);
        }
    }
}
