using HairSalonSystem.Services.Constant;
using HairSalonSystem.API.DTOs;
using HairSalonSystem.Services.PayLoads.Requests.Accounts;
using HairSalonSystem.Services.PayLoads.Responses.Accounts;
using HairSalonSystem.Services.Util;
using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HairSalonSystem.Services.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SysAdminController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IAuthService _authService;
        public SysAdminController(IAccountService accountService, IAuthService authService)
        {
            _accountService = accountService;
            _authService = authService;
        }


        
        [HttpPost(APIEndPointConstant.Account.Register)]
        [ProducesResponseType(typeof(CreateNewAccountResponse), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        public async Task<ActionResult> AddAccountAll([FromBody] CreateNewAccountRequest accountDto)
        {
            var account = new Account
            {
                AccountId = Guid.NewGuid(),
                Email = accountDto.Email,
                Password = PasswordUtil.HashPassword(accountDto.Password),
                RoleName = Enums.RoleEnums.SA.GetDescriptionFromEnum(),
                InsDate = TimeUtils.GetCurrentSEATime(),
                UpdDate = TimeUtils.GetCurrentSEATime(),
                DelFlg = true

            };


            await _accountService.AddAccount(account);
            CreateNewAccountResponse accountSAResponse = new CreateNewAccountResponse()
            {
                Email = account.Email,
                Password = account.Password,
            };
            return StatusCode(StatusCodes.Status201Created, accountSAResponse);

        }
    }
}
