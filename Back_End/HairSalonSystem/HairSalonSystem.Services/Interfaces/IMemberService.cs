using HairSalonSystem.BusinessObject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.Interfaces
{
    public interface IMemberService
    {
        Task<Member> GetMemberById(Guid id);
        Task<List<Member>> GetAllMembers();
        Task AddMember(Member member);
        Task UpdateMember(Member member);
        Task RemoveMember(Guid id);
    }
}
