using HairSalonSystem.API.DTO;
using HairSalonSystem.API.Util;
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

        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAccountById(Guid id)
        {
            var account = await _accountService.GetAccountById(id);
            if (account == null)
            {
                return NotFound();
            }
            return Ok(account);
        }

        [HttpGet]
        public async Task<ActionResult<List<Account>>> GetAllAccounts()
        {
            var accounts = await _accountService.GetAllAccounts();
            return Ok(accounts);
        }

        [HttpPost]
        public async Task<ActionResult> AddAccount([FromBody] Account accountDto)
        {
            var account = new Account
            {
                // Map các trường từ accountDto vào Account
                Email = accountDto.Email,
                Password = PasswordUtil.HashPassword(accountDto.Password), // Giả sử đã có mã hóa trong dịch vụ
                RoleName = accountDto.RoleName
            };
            await _accountService.AddAccount(account);
            return CreatedAtAction(nameof(GetAccountById), new { id = account.AccountId }, account);
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

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login([FromBody] Login request)
        {
            var account = await _authService.Authenticate(request.Email, PasswordUtil.HashPassword(request.Password));
            if (account == null)
            {
                return Unauthorized();
            }

            var token = await _authService.GenerateJwtToken(account);
            return Ok(token);
        }
    }
}
