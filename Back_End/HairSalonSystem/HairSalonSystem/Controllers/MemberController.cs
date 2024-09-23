using HairSalonSystem.API.Constant;
using HairSalonSystem.API.PayLoads.Requests.Members;
using HairSalonSystem.API.PayLoads.Responses.Members;
using HairSalonSystem.API.Util;
using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HairSalonSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : ControllerBase
    {
        private readonly IMemberService _memberService;

        public MemberController(IMemberService memberService)
        {
            _memberService = memberService;
        }

        // Get Member by ID
        [HttpGet("{id}")]
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

        // Get All Members
        [HttpGet]
        [ProducesResponseType(typeof(List<Member>), StatusCodes.Status200OK)]
        public async Task<ActionResult<List<Member>>> GetAllMembers()
        {
            var members = await _memberService.GetAllMembers();
            return Ok(members);
        }

        // Create New Member
        [HttpPost]
        [ProducesResponseType(typeof(CreateNewMemberResponse), StatusCodes.Status201Created)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        public async Task<ActionResult> CreateNewMember([FromBody] CreateNewMemberRequest memberRequest)
        {
            var member = new Member
            {
                MemberId = Guid.NewGuid(),
                MemberName = memberRequest.MemberName,
                DateOfBirth = memberRequest.DateOfBirth,
                PhoneNumber = memberRequest.PhoneNumber,
                Address = memberRequest.Address,
                AvatarImage = memberRequest.AvatarImage,
                InsDate = TimeUtils.GetCurrentSEATime(),
                UpdDate = TimeUtils.GetCurrentSEATime(),
                DelFlg = false
            };

            await _memberService.AddMember(member);

            var memberResponse = new CreateNewMemberResponse
            {
                MemberName = member.MemberName,
                DateOfBirth = member.DateOfBirth,   
                PhoneNumber = member.PhoneNumber,
                Address = member.Address,
                AvatarImage = member.AvatarImage  
            };

            return StatusCode(StatusCodes.Status201Created, memberResponse);
        }


        // Update Existing Member
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesErrorResponseType(typeof(BadRequestResult))]
        public async Task<ActionResult> UpdateMember(Guid id, [FromBody] CreateNewMemberRequest memberRequest)
        {
            var existingMember = await _memberService.GetMemberById(id);
            if (existingMember == null)
            {
                return NotFound();
            }

            existingMember.MemberName = memberRequest.MemberName;
            existingMember.PhoneNumber = memberRequest.PhoneNumber;
            existingMember.Address = memberRequest.Address;
            existingMember.DateOfBirth = memberRequest.DateOfBirth;
            existingMember.UpdDate = TimeUtils.GetCurrentSEATime();

            await _memberService.UpdateMember(existingMember);

            return NoContent();
        }

        // Delete Member
        [HttpDelete("{id}")]
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

            return NoContent();
        }
    }
}
