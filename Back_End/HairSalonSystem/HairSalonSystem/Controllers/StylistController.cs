﻿using HairSalonSystem.Services.Constant;
using HairSalonSystem.Services.Controllers;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.PayLoads.Requests.Stylists;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;

namespace HairSalonSystem.API.Controllers
{
    [Route(APIEndPointConstant.Stylist.StylistEndpoint)]
    [ApiController]
    public class StylistController : BaseController<StylistController>
    {
        private readonly IStylistService _stylistService;

        public StylistController(IStylistService stylistService, ILogger<StylistController> logger) : base(logger)
        {
            _stylistService = stylistService;
        }
        [HttpPost]
        [Authorize(Roles = "SA,SM,SL")]
        [Route(APIEndPointConstant.Stylist.AddStylist)]
        public async Task<IActionResult> CreateStylist([FromForm] CreateStylistRequest request)
        {
            var result = await _stylistService.CreateStylistAsync(request, HttpContext);
            return Ok(result);
        }

        [HttpGet]
        [Route(APIEndPointConstant.Stylist.GetStylistById)]
        public async Task<IActionResult> GetStylistById(Guid id)
        {
            var result = await _stylistService.GetStylistByIdAsync(id);
            return Ok(result);
        }

        [HttpGet]
        [Route(APIEndPointConstant.Stylist.GetAllStylists)]
        public async Task<IActionResult> GetAllStylists()
        {
            var result = await _stylistService.GetAllStylistsAsync();
            return Ok(result);
        }

        [HttpPut]
        [Authorize(Roles = "SA,SM,SL")]
        [Route(APIEndPointConstant.Stylist.UpdateStylist)]
        public async Task<IActionResult> UpdateStylist([FromRoute] Guid id, [FromForm] UpdateStylistRequest request)
        {
            await _stylistService.UpdateStylistAsync(id, request,HttpContext);
            return Ok(new { Message = MessageConstant.StylistMessage.StylistUpdated });
        }

        [HttpDelete]
        [Authorize(Roles = "SA,SM")]
        [Route(APIEndPointConstant.Stylist.DeleteStylist)]
        public async Task<IActionResult> DeleteStylist(Guid id)
        {
            await _stylistService.DeleteStylistAsync(id, HttpContext);
            return Ok(new { Message = MessageConstant.StylistMessage.StylistDeleted });
        }

        [HttpGet]
        [Authorize(Roles = "SA,SM")]
        [Route(APIEndPointConstant.Stylist.GetStylistByStaffStylist)]
        public async Task<IActionResult> GetStylistByStaffStylist(Guid staffStylistId)
        {
            var result = await _stylistService.GetStylistByStaffStylistAsync(staffStylistId);
            return Ok(result);
        }
        [HttpGet]
        [Route(APIEndPointConstant.Stylist.GetStylistByBranchId)]
        public async Task<IActionResult> GetStylistByBranchId(Guid branchId)
        {
            var result = await _stylistService.GetStylistByBranchIdAsync(branchId);
            return Ok(result);
        }
        [HttpGet]
        [Route(APIEndPointConstant.Stylist.GetRandomStylistByBranchId)]
        public async Task<IActionResult> GetRandomStylistByBranchId(Guid branchId)
        {
            var result = await _stylistService.GetRandomStylistByBranchIdAsync(branchId);
            return Ok(result);
        }

    }
}
