using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Interface;
using HairSalonSystem.Services.Constant;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.PayLoads.Requests.Service;
using HairSalonSystem.Services.Util;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.Implements
{
    public class ServiceService : IServiceService
    {
        private readonly IServiceRepository _serviceRepository;
        public ServiceService(IServiceRepository serviceRepository)
        {
            _serviceRepository = serviceRepository;
        }

        public async Task<ActionResult> CreateService(CreateServiceRequest serviceModel, HttpContext context)
        {
            var accountID = UserUtil.GetAccountId(context);
            if (accountID == null)
            {
                return new ObjectResult(MessageConstant.ServiceMessage.CreateRight)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }

            var roleName = UserUtil.GetRoleName(context);
            if (roleName != "SA")
            {
                return new ObjectResult(MessageConstant.ServiceMessage.CreateRight)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }

            var service = new Service
            {
                ServiceID = Guid.NewGuid(),
                ServiceName = serviceModel.ServiceName,
                Type = serviceModel.Type,
                Price = serviceModel.Price,
                Description = serviceModel.Description,
                Duration = serviceModel.Duration,
                AvatarImage = serviceModel.AvatarImage,
                InsDate = TimeUtils.GetCurrentSEATime(),
                UpdDate = TimeUtils.GetCurrentSEATime(),
                DelFlg = serviceModel.DelFlg,

            };

            await _serviceRepository.CreateService(service);
            return new ObjectResult(MessageConstant.ServiceMessage.CreateSuccess)
            {
                StatusCode = StatusCodes.Status201Created,
                Value = service
            };
        }

        public async Task<ActionResult> DeleteService(Guid serviceId, HttpContext context)
        {
            var accountID = UserUtil.GetAccountId(context);
            if (accountID == null)
            {
                return new ObjectResult(MessageConstant.ServiceMessage.DeleteRight)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }

            var roleName = UserUtil.GetRoleName(context);
            if (roleName != "SA")
            {
                return new ObjectResult(MessageConstant.ServiceMessage.DeleteRight)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }
            var oldService = await _serviceRepository.GetServiceById(serviceId);
            if (oldService == null)
            {
                return new ObjectResult(MessageConstant.ServiceMessage.NotFound)
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }
            oldService.DelFlg = false;
            await _serviceRepository.UpdateService(oldService);
            return new ObjectResult(MessageConstant.ServiceMessage.DeleteSuccess);

        }

        public async Task<ActionResult<Service>> GetServiceById(Guid serviceId)
        {
            var service = await _serviceRepository.GetServiceById(serviceId);
            if (service == null)
            {
                return new ObjectResult(MessageConstant.ServiceMessage.NotFound)
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }
            return new OkObjectResult(service);
        }

        public async Task<ActionResult<List<Service>>> GetServiceList(QueryService query)
        {
            var service = await _serviceRepository.GetAllService();
            if(!string.IsNullOrEmpty(query.ServiceName))
            {
                service = service.AsQueryable().Where(x => x.ServiceName.ToLower() == query.ServiceName.ToLower()).ToList();
            }
            if(query.Type.HasValue)
            {
                service = service.AsQueryable().Where(x => x.Type == query.Type).ToList();
            }
            if(query.MaxPrice.HasValue)
            {
                service = service.AsQueryable().Where(x => x.Price <= query.MaxPrice).ToList();
            }
            if (query.DelFig.HasValue)
            {
                service = service.AsQueryable().Where(x => x.DelFlg == query.DelFig).ToList();
            }
            if (query.pageIndex.HasValue && query.pageSize.HasValue)
            {
                int validPageIndex = query.pageIndex.Value > 0 ? query.pageIndex.Value - 1 : 0;
                int validPageSize = query.pageSize.Value > 0 ? query.pageSize.Value : 10;

                service = service.Skip(validPageIndex * validPageSize).Take(validPageSize).ToList();
            }
            if(service.Count == 0)
            {
                return new ObjectResult(MessageConstant.ServiceMessage.NotFound)
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }
            return new OkObjectResult(service);

        }

        public async Task<ActionResult> UpdateService(Guid serviceId, CreateServiceRequest serviceModel, HttpContext context)
        {
            var accountID = UserUtil.GetAccountId(context);
            if (accountID == null)
            {
                return new ObjectResult(MessageConstant.ServiceMessage.UpdateRight)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }

            var roleName = UserUtil.GetRoleName(context);
            if (roleName != "SA")
            {
                return new ObjectResult(MessageConstant.ServiceMessage.UpdateRight)
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }
            var oldService = await _serviceRepository.GetServiceById(serviceId);
            if (oldService == null)
            {
                return new ObjectResult(MessageConstant.ServiceMessage.NotFound)
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }
            oldService.ServiceName = serviceModel.ServiceName;
            oldService.Type = serviceModel.Type;
            oldService.Price = serviceModel.Price;
            oldService.Description = serviceModel.Description;
            oldService.Duration = serviceModel.Duration;
            oldService.AvatarImage = serviceModel.AvatarImage;
            oldService.UpdDate = TimeUtils.GetCurrentSEATime();
            oldService.DelFlg = serviceModel.DelFlg;
            await _serviceRepository.UpdateService(oldService);
            return new ObjectResult(MessageConstant.ServiceMessage.UpdateSuccess);

            

          
        }
    }
}
