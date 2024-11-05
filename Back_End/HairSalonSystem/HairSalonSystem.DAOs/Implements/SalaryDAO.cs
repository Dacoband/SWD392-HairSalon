using HairSalonSystem.BusinessObject;
using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.DAOs.Interfaces;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.DAOs.Implements
{
    public class SalaryDAO : ISalaryDAO
    {
        private readonly IMongoCollection<Salary> _salaryCollection;
        public SalaryDAO(HairSalonContext context)
        {
            _salaryCollection = context.Salary;
        }
        public async Task CreateSalary(Salary salary)
        {
            await _salaryCollection.InsertOneAsync(salary);

        }

        public async Task DeleteSalary(Guid salaryId)
        {
            var filter = Builders<Salary>.Filter.Eq(x => x.SalaryId, salaryId);
            var update = Builders<Salary>.Update.Set(x => x.DelFlg, false);

            await _salaryCollection.UpdateOneAsync(filter, update);
        }

        public async Task<List<Salary>> GetAllSalary()
        {
            return await _salaryCollection.Find(_ => true).ToListAsync();
        }

        public async Task<Salary> GetSalaryById(Guid salaryId)
        {
            return await _salaryCollection.Find(x => x.SalaryId == salaryId).FirstOrDefaultAsync();
        }

        public async Task UpdateSalary(Salary salary)
        {
            await _salaryCollection.ReplaceOneAsync(x => x.SalaryId == salary.SalaryId, salary);
        }
    }
}
