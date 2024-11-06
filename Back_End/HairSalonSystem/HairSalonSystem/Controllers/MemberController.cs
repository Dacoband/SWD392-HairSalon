using HairSalonSystem.Services.Constant;
using HairSalonSystem.Services.PayLoads.Requests.Members;
using HairSalonSystem.Services.PayLoads.Responses.Members;
using HairSalonSystem.Services.Util;
using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;

namespace HairSalonSystem.Services.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : ControllerBase
    {
        private readonly IMemberService _memberService;
        private readonly IAccountService _accountService;
        private readonly IFirebaseService _firebaseService;

        public MemberController(IMemberService memberService, IAccountService accountService, IFirebaseService firebaseService) 
        {
            _memberService = memberService;
            _accountService = accountService;
            _firebaseService = firebaseService;
        }

        [HttpGet(APIEndPointConstant.Member.GetMemberById)]
        [ProducesResponseType(typeof(Member), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(NotFoundResult))]
        public async Task<ActionResult<Member>> GetMemberById(Guid id)
        {
            var member = await _memberService.GetMemberById(id);
            if (member == null)
            {
                return NotFound();
            }
            return Ok(member);
        }

       
        [HttpGet(APIEndPointConstant.Member.GetAllMembers)]
        [ProducesResponseType(typeof(List<Member>), StatusCodes.Status200OK)]
        public async Task<ActionResult<List<Member>>> GetAllMembers()
        {
            var members = await _memberService.GetAllMembers();
            return Ok(members);
        }

        
        [HttpPost(APIEndPointConstant.Member.AddMember)]
        [ProducesResponseType(typeof(CreateNewMemberResponse), StatusCodes.Status201Created)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        public async Task<ActionResult> CreateNewMember([FromForm] CreateNewMemberRequest memberRequest)
        {
            var roleName = UserUtil.GetRoleName(HttpContext);
            var isEmailExist = await _accountService.IsEmailExist(memberRequest.Email);
            if (isEmailExist)
            {
                return Problem(MessageConstant.MemberMessage.EmailExist);
<<<<<<< HEAD
            }           
            var url = await _firebaseService.UploadFile(memberRequest.AvatarImage);
=======
            }
            var url = "";
            if(memberRequest.AvatarImage != null) {
                url = await _firebaseService.UploadFile(memberRequest.AvatarImage);
            }
>>>>>>> Thaiyud

            var account = new Account()
            {
                AccountId = Guid.NewGuid(),
                Email = memberRequest.Email,
                Password = PasswordUtil.HashPassword(memberRequest.Password),
                RoleName = Enums.RoleEnums.MB.GetDescriptionFromEnum(),
                InsDate = DateTime.Now,
                UpdDate = DateTime.Now,
                DelFlg = true
            };
            await _accountService.AddAccount(account);
            var member = new Member
            {
                MemberId = Guid.NewGuid(),
                AccountId = account.AccountId,
                MemberName = memberRequest.MemberName,
                DateOfBirth = memberRequest.DateOfBirth,
                PhoneNumber = memberRequest.PhoneNumber,
                Address = memberRequest.Address,
                AvatarImage = url,
                InsDate = DateTime.Now,
                UpdDate = DateTime.Now,
                DelFlg = true
            };

            await _memberService.AddMember(member);

            var memberResponse = new CreateNewMemberResponse
            {
                Email = account.Email,
                MemberName = member.MemberName,
                RoleName = account.RoleName,
                DateOfBirth = member.DateOfBirth,
                PhoneNumber = member.PhoneNumber,
                Address = member.Address,
                AvatarImage = member.AvatarImage
            };

            return StatusCode(StatusCodes.Status201Created, memberResponse);
        }


        // Update Existing Member
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
       
        public async Task<bool> UpdateMember([FromRoute] Guid id, [FromForm] UpdateMemberRequest memberRequest)
        {
           return  await _memberService.UpdateMember(id, memberRequest, HttpContext);
        }
        // Delete Member
        [HttpDelete(APIEndPointConstant.Member.DeleteMember)]
        [Authorize(Roles = "SA")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesErrorResponseType(typeof(NotFoundResult))]
        public async Task<ActionResult> RemoveMember(Guid id)
        {
            var existingMember = await _memberService.GetMemberById(id);
            if (existingMember == null)
            {
                return NotFound();
            }

            await _memberService.RemoveMember(id);
            return Content( MessageConstant.MemberMessage.MemberDeleted);
        }
    }
}
