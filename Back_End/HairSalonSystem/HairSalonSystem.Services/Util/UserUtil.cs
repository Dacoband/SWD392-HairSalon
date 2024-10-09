using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace HairSalonSystem.Services.Util
{
    public class UserUtil
    {

        public static Guid? GetAccountId(HttpContext httpContext)
        {
            if (httpContext == null || httpContext.User == null)
            {
                return null;
            }

            var nameIdentifierClaim = httpContext.User.FindFirst(ClaimTypes.NameIdentifier);
            if (nameIdentifierClaim == null)
            {
                return null;
            }

            if (!Guid.TryParse(nameIdentifierClaim.Value, out Guid accountId))
            {
                throw new BadHttpRequestException(nameIdentifierClaim.Value);

            }
            return accountId;
        }



        public static string GetRoleName(HttpContext httpContext)
            {
                var roleClaim = httpContext.User.FindFirst(ClaimTypes.Role);
                return roleClaim?.Value;
            }
        
    }
}
