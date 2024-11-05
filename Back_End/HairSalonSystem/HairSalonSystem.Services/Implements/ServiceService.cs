using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Repositories.Interface;
using HairSalonSystem.Services.Constant;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.PayLoads.Requests.Service;
using HairSalonSystem.Services.PayLoads.Responses.Service;
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
        private readonly IFirebaseService _firebaseService;
        public ServiceService(IServiceRepository serviceRepository, IFirebaseService firebaseService)
        {
            _serviceRepository = serviceRepository;
            _firebaseService = firebaseService;
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
            var url = await _firebaseService.UploadFile(serviceModel.AvatarImage);
            var service = new BusinessObject.Entities.Service
            {
                ServiceID = Guid.NewGuid(),
                ServiceName = serviceModel.ServiceName,
                Type = serviceModel.Type,
                Price = serviceModel.Price,
                Description = serviceModel.Description,
                Duration = serviceModel.Duration,
                AvatarImage = url,
                InsDate = DateTime.Now,
                UpdDate = DateTime.Now,
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

        public async Task<ActionResult<ServiceResponse>> GetServiceById(Guid serviceId)
        {
            var service = await _serviceRepository.GetServiceById(serviceId);
            if (service == null)
            {
                return new ObjectResult(MessageConstant.ServiceMessage.NotFound)
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }
            ServiceResponse response = new ServiceResponse()
            {
                ServiceID = service.ServiceID,
                ServiceName = service.ServiceName,
                Type = service.Type,
                Price = service.Price,
                Description = service.Description,
                Duration = service.Duration,
                AvatarImage = service.AvatarImage,
                InsDate = service.InsDate,
                UpdDate = service.UpdDate,
                DelFlg = service.DelFlg,
            };
            return new OkObjectResult(response);
        }

        public async Task<ActionResult<List<ServiceResponse>>> GetServiceList(QueryService query)
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
            List<ServiceResponse> resList = new List<ServiceResponse>();
            resList = service.Select(x => new ServiceResponse()
            {
                ServiceID = x.ServiceID,
                ServiceName = x.ServiceName,
                Type = x.Type,
                Price = x.Price,
                Description = x.Description,
                Duration = x.Duration,
                AvatarImage = x.AvatarImage,
                InsDate = x.InsDate,
                UpdDate = x.UpdDate,
                DelFlg = x.DelFlg,

            }).ToList();
            return new OkObjectResult(resList);

        }

        public async Task<ActionResult> UpdateService(Guid serviceId, CreateServiceRequest serviceModel, HttpContext context)
        {
            var accountID = UserUtil.GetAccountId(context);
            //if (accountID == null)
            //{
            //    return new ObjectResult(MessageConstant.ServiceMessage.UpdateRight)
            //    {
            //        StatusCode = StatusCodes.Status403Forbidden
            //    };
            //}

            //var roleName = UserUtil.GetRoleName(context);
            //if (roleName != "SA")
            //{
            //    return new ObjectResult(MessageConstant.ServiceMessage.UpdateRight)
            //    {
            //        StatusCode = StatusCodes.Status403Forbidden
            //    };
            //}
            var oldService = await _serviceRepository.GetServiceById(serviceId);
            if (oldService == null)
            {
                return new ObjectResult(MessageConstant.ServiceMessage.NotFound)
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }

            var url = await _firebaseService.UploadFile(serviceModel.AvatarImage);
            oldService.ServiceName = serviceModel.ServiceName;
            oldService.Type = serviceModel.Type;
            oldService.Price = serviceModel.Price;
            oldService.Description = serviceModel.Description;
            oldService.Duration = serviceModel.Duration;
            oldService.AvatarImage = url;
            oldService.UpdDate = DateTime.Now;
            oldService.DelFlg = serviceModel.DelFlg;
            await _serviceRepository.UpdateService(oldService);
            return new ObjectResult(MessageConstant.ServiceMessage.UpdateSuccess);

            

          
        }
    }
}
