using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HairSalonSystem.DAOs.Interface;

namespace HairSalonSystem.Repositories.Implement
{
    public class MemberRepository : IMemberRepository
    {
        private readonly IMemberDAO _memberDAO;

        public MemberRepository(IMemberDAO memberDAO)
        {
            _memberDAO = memberDAO;
        }

        public async Task<Member> GetMemberById(Guid id)
        {
            return await _memberDAO.GetMemberById(id);
        }

        public async Task<List<Member>> GetAllMembers()
        {
            return await _memberDAO.GetAllMembers();
        }

        public async Task AddMember(Member member)
        {
            await _memberDAO.CreateMember(member);
        }

        public async Task UpdateMember(Member member)
        {
            await _memberDAO.UpdateMember(member.MemberId, member);
        }

        public async Task RemoveMember(Guid id)
        {
            await _memberDAO.DeleteMember(id);
        }

    }
}
