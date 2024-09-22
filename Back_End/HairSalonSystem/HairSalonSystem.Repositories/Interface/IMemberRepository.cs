using HairSalonSystem.BusinessObject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Repositories.Interface
{
    public interface IMemberRepository
    {
        Task<Member> GetMemberById(Guid id);
        Task<List<Member>> GetAllMembers();
        Task AddMember(Member member);
        Task UpdateMember(Member member);
        Task RemoveMember(Guid id);
    }
}
