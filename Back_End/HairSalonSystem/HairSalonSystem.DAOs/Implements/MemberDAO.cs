using HairSalonSystem.BusinessObject;
using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.DAOs.Interface;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.DAOs.Implement
{
    public class MemberDAO : IMemberDAO
    {
        private readonly IMongoCollection<Member> _members;

        public MemberDAO(HairSalonContext context)
        {
            _members = context.Members;
        }

        public async Task CreateMember(Member member)
        {
            await _members.InsertOneAsync(member);
        }

        public async Task<Member> GetMemberById(Guid id)
        {
            return await _members.Find(m => m.MemberId == id).FirstOrDefaultAsync();
        }

        public async Task<List<Member>> GetAllMembers()
        {
            return await _members.Find(_ => true).ToListAsync();
        }

        public async Task UpdateMember(Guid id, Member member)
        {
            await _members.ReplaceOneAsync(m => m.MemberId == id, member);
        }

        public async Task DeleteMember(Guid id)
        {
            await _members.DeleteOneAsync(m => m.MemberId == id);
        }
    }
}
