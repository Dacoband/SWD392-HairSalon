using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Services.PayLoads.Requests.Service;
using HairSalonSystem.Services.PayLoads.Responses.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.Interfaces
{
    public interface IServiceService
    {
        Task<ActionResult<ServiceResponse>> GetServiceById(Guid serviceId);
        Task<ActionResult> CreateService(CreateServiceRequest service, HttpContext context);
        Task<ActionResult<List<ServiceResponse>>> GetServiceList(QueryService query);
        Task<ActionResult> UpdateService(Guid serviceId, UpdateServiceRequest request, HttpContext context);
        Task<ActionResult> DeleteService(Guid serviceId,HttpContext context);
    }
}
