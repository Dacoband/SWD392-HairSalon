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
        public async Task<bool> UpdateAccount([FromRoute] Guid id, [FromBody] CreateUpdateAccountRequest request)
        {
            var account = await _accountService.GetAccountById(id);
 
            account.Email = string.IsNullOrEmpty(request.Email) ? account.Email : request.Email;
            account.Password = string.IsNullOrEmpty(request.Password) ? account.Password : PasswordUtil.HashPassword(request.Password);

            await _accountService.UpdateAccount(account);
            return true;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoveAccount(Guid id)
        {
            await _accountService.RemoveAccount(id);
            return Content(MessageConstant.AccountMessage.AccountDeleted);
        }


        [HttpPost(APIEndPointConstant.Authentication.Login)]
        [ProducesResponseType(typeof(LoginResponse), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(UnauthorizedObjectResult))]
       
        public async Task<ActionResult<string>> Login([FromForm] LoginRequest request)
        {
<<<<<<< HEAD
            var (account, actorId) = await _authService.Authenticate(request.Email, PasswordUtil.HashPassword(request.Password));
=======
            var (account, actorId, branchId) = await _authService.Authenticate(request.Email, PasswordUtil.HashPassword(request.Password));
>>>>>>> Thaiyud
            if (account == null)
            {
                return Unauthorized(new Services.PayLoads.ErrorResponse()
                {
                    StatusCode = StatusCodes.Status401Unauthorized,
                    Error = MessageConstant.LoginMessage.InvalidUsernameOrPassword,
                    TimeStamp = DateTime.Now
                });
            }

<<<<<<< HEAD
            var token = await _authService.GenerateJwtToken(account, actorId);
            var loginResponse = new LoginResponse
            {
                Token = token,
                actorId = actorId ?? Guid.Empty,
=======
            var token = await _authService.GenerateJwtToken(account, actorId, account.AccountId);
            var loginResponse = new LoginResponse
            {
                Token = token,
                actorId = actorId ?? Guid.Empty,
                branchId = branchId ?? Guid.Empty,
>>>>>>> Thaiyud
                Email = account.Email,
                RoleName = account.RoleName
            };
            return Ok(loginResponse);
        }
    }
}
