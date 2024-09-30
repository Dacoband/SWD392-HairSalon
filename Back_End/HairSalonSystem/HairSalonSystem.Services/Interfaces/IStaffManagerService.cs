using HairSalonSystem.BusinessObject.Entities;

using HairSalonSystem.Services.PayLoads.Requests.StaffManagers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;



namespace HairSalonSystem.Services.Interfaces
{
    public interface IStaffManagerService
    {
        Task<StaffManager> GetStaffManagerById(Guid id);
        Task<List<StaffManager>> GetAllStaffManagers();
        Task<ActionResult> AddStaffManager(CreateNewStaffManagerRequest staffManager, HttpContext httpContext);
        Task<bool> UpdateStaffManager(Guid id, UpdateStaffManagerRequest staffManagerRequest, HttpContext httpContext);
        Task RemoveStaffManager(Guid id);
    }
}
