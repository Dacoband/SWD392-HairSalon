using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Interface;
using HairSalonSystem.Services.Interfaces;
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

        public async Task UpdateMember(Member member)
        {
            // Additional business logic can be added here if needed
            await _memberRepository.UpdateMember(member);
        }

        public async Task RemoveMember(Guid id)
        {
            // Additional business logic can be added here if needed
            await _memberRepository.RemoveMember(id);
        }
    }
}
