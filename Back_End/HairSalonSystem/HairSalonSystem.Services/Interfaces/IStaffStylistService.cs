using HairSalonSystem.Services.PayLoads.Requests.StaffStylists;
using HairSalonSystem.Services.PayLoads.Responses.StaffStylists;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.Interfaces
{
    public interface IStaffStylistService
    {
        Task<CreateStaffStylistResponse> CreateStaffStylistAsync(CreateStaffStylistRequest request, HttpContext httpContext);
        Task<StaffStylistResponse> GetStaffStylistByIdAsync(Guid id);
        Task<StaffStylistResponse> GetStaffStylistByAccountIdAsync(Guid accountId);
        Task<List<StaffStylistResponse>> GetAllStaffStylistsAsync();
        Task UpdateStaffStylistAsync(Guid id, UpdateStaffStylistRequest request);
        Task DeleteStaffStylistAsync(Guid id);
        Task<List<StaffStylistResponse>> GetStaffStylistsByBranchIdAsync(Guid branchId);
    }
}
