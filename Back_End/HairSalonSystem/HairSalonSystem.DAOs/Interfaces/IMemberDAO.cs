using HairSalonSystem.BusinessObject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.DAOs.Interface
{
    public interface IMemberDAO
    {
        Task CreateMember(Member member);
        Task<Member> GetMemberById(Guid id);
        Task<List<Member>> GetAllMembers();
        Task UpdateMember(Guid id, Member member);
        Task DeleteMember(Guid id);
    }
}
