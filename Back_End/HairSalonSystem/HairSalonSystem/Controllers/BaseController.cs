using HairSalonSystem.Services.Constant;
using Microsoft.AspNetCore.Mvc;

namespace HairSalonSystem.Services.Controllers
{
    [Route(APIEndPointConstant.ApiEndpoint)]
    [ApiController]
    public class BaseController<T> : ControllerBase where T : BaseController<T>
    {
        protected ILogger<T> _logger;

        public BaseController(ILogger<T> logger)
        {
            _logger = logger;
        }
    }
}
