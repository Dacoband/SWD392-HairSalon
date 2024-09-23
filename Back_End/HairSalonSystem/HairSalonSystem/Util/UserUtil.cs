using System.Security.Claims;

namespace HairSalonSystem.API.Util
{
    public class UserUtil
    {

        public static Guid GetAccountId(HttpContext httpContext)
        {
            if (httpContext == null || httpContext.User == null)
            {
                throw new BadHttpRequestException("Invalid HTTP context or user is null.");
            }

            var nameIdentifierClaim = httpContext.User.FindFirst(ClaimTypes.NameIdentifier);
            if (nameIdentifierClaim == null)
            {
                throw new BadHttpRequestException("Name identifier claim not found.");
            }

            if (!Guid.TryParse(nameIdentifierClaim.Value, out Guid accountId))
            {
                throw new BadHttpRequestException("Invalid account ID format.");
            }

            return accountId; // Trả về Guid mà không cần dấu hỏi
        }


        public static string GetRoleName(HttpContext httpContext)
            {
                var roleClaim = httpContext.User.FindFirst(ClaimTypes.Role);
                return roleClaim?.Value;
            }
        
    }
}
