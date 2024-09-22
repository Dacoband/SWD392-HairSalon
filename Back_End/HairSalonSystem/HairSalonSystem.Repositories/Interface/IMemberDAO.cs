using HairSalonSystem.BusinessObject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Repositories.Interface
{
    public interface IMemberDAO
    {
        Task<Member> GetMemberById(Guid id);
        Task<List<Member>> GetAllMembers();
        Task CreateMember(Member member);
        Task UpdateMember(Guid id, Member member);
        Task DeleteMember(Guid id);
    }
}
