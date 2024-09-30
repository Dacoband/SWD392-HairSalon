using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.Services.PayLoads.Requests;
using HairSalonSystem.Services.PayLoads.Requests.StaffManagers;
using Microsoft.AspNetCore.Http;



namespace HairSalonSystem.Services.Interfaces
{
    public interface IStaffManagerService
    {
        Task<StaffManager> GetStaffManagerById(Guid id);
        Task<List<StaffManager>> GetAllStaffManagers();
        Task AddStaffManager(StaffManager staffManager);
        Task<bool> UpdateStaffManager(Guid id, UpdateStaffManagerRequest staffManagerRequest, HttpContext httpContext);
        Task RemoveStaffManager(Guid id);
    }
}
