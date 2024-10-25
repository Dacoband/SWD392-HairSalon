using Amazon.Runtime.Internal;
using HairSalonSystem.Services.Constant;
using HairSalonSystem.API.DTOs;
using HairSalonSystem.Services.PayLoads;
using HairSalonSystem.Services.PayLoads.Requests;
using HairSalonSystem.Services.PayLoads.Requests.Accounts;
using HairSalonSystem.Services.PayLoads.Responses.Accounts;
using HairSalonSystem.Services.Util;
using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HairSalonSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IAuthService _authService;

        public AccountController(IAccountService accountService, IAuthService authService)
        {
            _accountService = accountService;
            _authService = authService;
        }

        [HttpGet(APIEndPointConstant.Account.GetAccountById)]
        [ProducesResponseType(typeof(Account), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        public async Task<ActionResult<Account>> GetAccountById(Guid id)
        {
           return await _accountService.GetAccountById(id);
        }

        [HttpGet]
        public async Task<ActionResult<List<Account>>> GetAllAccounts()
        {
            var accounts = await _accountService.GetAllAccounts();
            return Ok(accounts);
        }

        

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAccount(Guid id, [FromBody] Account accountDto)
        {
            if (id != accountDto.AccountId)
            {
                return BadRequest();
            }

            var account = new Account
            {
                AccountId = id,
                Email = accountDto.Email,
                Password = PasswordUtil.HashPassword(accountDto.Password),
                RoleName = accountDto.RoleName
            };
            await _accountService.UpdateAccount(account);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoveAccount(Guid id)
        {
            await _accountService.RemoveAccount(id);
            return NoContent();
        }


        [HttpPost(APIEndPointConstant.Authentication.Login)]
        [ProducesResponseType(typeof(LoginResponse), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(UnauthorizedObjectResult))]
       
        public async Task<ActionResult<string>> Login([FromBody] LoginRequest request)
        {
            var account = await _authService.Authenticate(request.Email, PasswordUtil.HashPassword(request.Password));
            if (account == null)
            {
                return Unauthorized(new Services.PayLoads.ErrorResponse()
                {
                    StatusCode = StatusCodes.Status401Unauthorized,
                    Error = MessageConstant.LoginMessage.InvalidUsernameOrPassword,
                    TimeStamp = DateTime.Now
                });
            }

            var token = await _authService.GenerateJwtToken(account);
            var loginResponse = new LoginResponse
            {
                Token = token,
                Email = account.Email,
                RoleName = account.RoleName
            };
            return Ok(loginResponse);
        }
    }
}
