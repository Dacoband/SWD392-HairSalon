using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Services.Constant;
using HairSalonSystem.Services.Controllers;
using HairSalonSystem.Services.Implements;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.PayLoads.Requests.Branchs;
using HairSalonSystem.Services.PayLoads.Requests.Service;
using HairSalonSystem.Services.PayLoads.Responses.Branchs;
using HairSalonSystem.Services.PayLoads.Responses.Service;
using Microsoft.AspNetCore.Mvc;

namespace HairSalonSystem.API.Controllers
{
    [ApiController]
    public class ServiceController : BaseController<ServiceController>
    {
        private readonly IServiceService _serviceService;
        public ServiceController(ILogger<ServiceController> logger, IServiceService serviceService) : base(logger)
        {
            _serviceService = serviceService;
        }
        [HttpGet(APIEndPointConstant.Service.GetServiceById)]
        [ProducesResponseType(typeof(ServiceResponse), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]

        public async Task<ActionResult<ServiceResponse>> GetServiceById([FromRoute] Guid id)
        {
            return await _serviceService.GetServiceById(id);
        }

        [HttpPost(APIEndPointConstant.Service.CreateService)]
        [ProducesResponseType(typeof(Service), StatusCodes.Status201Created)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        public async Task<ActionResult> CreateService([FromForm] CreateServiceRequest serviceModel)
        {
            return await _serviceService.CreateService(serviceModel, HttpContext);

        }
        [HttpGet(APIEndPointConstant.Service.GetAllService)]
        [ProducesResponseType(typeof(ServiceResponse), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]

        public async Task<ActionResult<List<ServiceResponse>>> GetAllService([FromQuery] QueryService query)
        {
            return await _serviceService.GetServiceList(query);
        }

        [HttpPatch(APIEndPointConstant.Service.UpdateService)]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        public async Task<ActionResult> UpdateService([FromRoute] Guid id, [FromForm] UpdateServiceRequest request)
        {
            return await _serviceService.UpdateService(id, request,HttpContext);
        }
        [HttpPatch(APIEndPointConstant.Service.DeleteService)]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesErrorResponseType(typeof(ProblemDetails))]
        public async Task<ActionResult> DeleteService([FromRoute] Guid id)
        {
            return await _serviceService.DeleteService(id, HttpContext);
        }
    }
}
