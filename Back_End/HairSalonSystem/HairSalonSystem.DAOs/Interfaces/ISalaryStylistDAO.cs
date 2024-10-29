using HairSalonSystem.BusinessObject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.DAOs.Interfaces
{
    public interface ISalaryStylistDAO
    {
        Task CreateSalaryStylistAsync(SalaryStylist salaryStylist);

        // Cập nhật một bản ghi BaseSalary
        Task UpdateSalaryStylistAsync(SalaryStylist salaryStylist);

        // Xóa mềm một bản ghi BaseSalary
        Task DeleteSalaryStylistAsync(Guid salaryStylistID);

        // Lấy một bản ghi BaseSalary dựa trên StylistID
        Task<SalaryStylist> GetSalaryByStylistIDAsync(Guid stylistID);

        // Lấy tất cả các bản ghi BaseSalary chưa bị xóa
        Task<List<SalaryStylist>> GetAllSalaryStylistAsync();
    }
}
