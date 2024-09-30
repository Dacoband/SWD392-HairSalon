using HairSalonSystem.BusinessObject.Entities;
using Microsoft.AspNetCore.Http;



namespace HairSalonSystem.Services.Interfaces
{
    public interface IStaffManagerService
    {
        Task<StaffManager> GetStaffManagerById(Guid id);
        Task<List<StaffManager>> GetAllStaffManagers();
        Task AddStaffManager(StaffManager staffManager);
        Task<bool> UpdateStaffManager(Guid id, UpdateStaff staffManagerRequest, HttpContext httpContext);
        Task RemoveStaffManager(Guid id);
    }
}
