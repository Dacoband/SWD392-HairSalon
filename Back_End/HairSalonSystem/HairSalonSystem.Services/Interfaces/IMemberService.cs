using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Services.PayLoads.Requests.Members;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        Task<ActionResult> UpdateMember(Guid id, UpdateMemberRequest memberRequest, HttpContext httpContext);
        Task RemoveMember(Guid id);
    }
}
