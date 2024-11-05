using HairSalonSystem.BusinessObject;
using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Interface;
using HairSalonSystem.Services.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.Implements
{
    public class AuthService : IAuthService
    {
        private readonly IAccountRepository _accountRepository;
        private readonly JwtSettings _jwtSettings;

        public AuthService(IAccountRepository accountRepository, IOptions<JwtSettings> jwtSettings)
        {
            _accountRepository = accountRepository;
            _jwtSettings = jwtSettings.Value;
        }

        public async Task<(Account, Guid?)> Authenticate(string email, string password)
        {
            var account = await _accountRepository.GetAccountByEmail(email);
            if (account == null || !VerifyPassword(account.Password, password))
            {
                return (null, null);
            }
            Guid? actorId = account.RoleName switch
            {
                "ST" => await _accountRepository.GetStylistId(account.AccountId),
                "SL" => await _accountRepository.GetStaffStylistId(account.AccountId),
                "SM" => await _accountRepository.GetStaffManagerId(account.AccountId),
                "MB" => await _accountRepository.GetMemberId(account.AccountId),
                _ => null
            };

            return (account, actorId);
        }

        private bool VerifyPassword(string storedPassword, string providedPassword)
        {
            return storedPassword == providedPassword; 
        }

        public async Task<string> GenerateJwtToken(Account account, Guid? actorId)
        {
            if (string.IsNullOrEmpty(account.RoleName))
            {
                throw new ArgumentException("Role name cannot be null or empty.");
            }

            var claims = new List<Claim>
            {
            new Claim(ClaimTypes.NameIdentifier, account.AccountId.ToString()),
            new Claim(ClaimTypes.Email, account.Email),
            new Claim(ClaimTypes.Role, account.RoleName)
        };
            if (actorId.HasValue)
            {
                claims.Add(new Claim("actorId", actorId.Value.ToString()));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expiration = DateTime.UtcNow.AddMinutes(_jwtSettings.Lifetime);

            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                expires: expiration,
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

}

