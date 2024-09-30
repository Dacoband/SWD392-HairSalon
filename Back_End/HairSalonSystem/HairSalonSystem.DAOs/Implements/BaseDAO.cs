using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.DAOs.Implements
{
    public class BaseDAO<T> where T : class
    {
        private readonly IMongoCollection<T> _collection;

        public BaseDAO(IMongoCollection<T> collection)
        {
            _collection = collection;
        }

        public async Task AddAsync(T entity)
        {
            await _collection.InsertOneAsync(entity);
        }

        public async Task UpdateAsync(FilterDefinition<T> filter, UpdateDefinition<T> update)
        {
            await _collection.UpdateOneAsync(filter, update);
        }

        public async Task DeleteAsync(FilterDefinition<T> filter)
        {
            var update = Builders<T>.Update.Set("DelFlg", false); // Assuming DelFlg is a common soft delete flag
            await _collection.UpdateOneAsync(filter, update);
        }

        public async Task<T> GetByIdAsync(FilterDefinition<T> filter)
        {
            return await _collection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task<List<T>> GetAllAsync(FilterDefinition<T> filter)
        {
            return await _collection.Find(filter).ToListAsync();
        }
    }
}
