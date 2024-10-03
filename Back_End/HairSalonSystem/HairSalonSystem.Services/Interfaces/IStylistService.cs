using HairSalonSystem.Services.PayLoads.Requests.Stylists;
using HairSalonSystem.Services.PayLoads.Responses.Stylists;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.Interfaces
{
    public interface IStylistService
    {
        Task<CreateStylistResponse> CreateStylistAsync(CreateStylistRequest request, HttpContext httpContext);
        Task<List<StylistResponse>> GetAllStylistsAsync();
        Task<StylistResponse> GetStylistByIdAsync(Guid id);
        Task<UpdateStylistResponse> UpdateStylistAsync(Guid id, UpdateStylistRequest request);
        Task DeleteStylistAsync(Guid id, HttpContext httpContext);
        Task<List<StylistResponse>> GetStylistByBranchIdAsync(Guid branchId);
        Task<List<StylistResponse>> GetStylistByStaffStylistAsync(Guid staffStylistId);
    }
}
