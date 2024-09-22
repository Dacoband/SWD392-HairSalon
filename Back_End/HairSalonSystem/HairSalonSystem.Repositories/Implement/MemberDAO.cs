using HairSalonSystem.BusinessObject;
using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Interface;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Repositories.Implement
{
    public class MemberDAO : IMemberDAO
    {
        private readonly IMongoCollection<Member> _members;


        public MemberDAO(HairSalonContext context)
        {
            _members = context.Members;
        }

        // Create a new Member
        public async Task CreateMember(Member member)
        {
            await _members.InsertOneAsync(member);
        }

        // Get a Member by ID
        public async Task<Member> GetMemberById(Guid id)
        {
            return await _members.Find(m => m.MemberId == id).FirstOrDefaultAsync();
        }

        // Get all Members
        public async Task<List<Member>> GetAllMembers()
        {
            return await _members.Find(_ => true).ToListAsync();
        }

        // Update a Member
        public async Task UpdateMember(Guid id, Member member)
        {
            await _members.ReplaceOneAsync(m => m.MemberId == id, member);
        }

        // Delete a Member by ID
        public async Task DeleteMember(Guid id)
        {
            await _members.DeleteOneAsync(m => m.MemberId == id);
        }
    }
}
