using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HairSalonSystem.BusinessObject.Entities;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace HairSalonSystem.BusinessObject
{
    public class HairSalonContext
    {

        private readonly IMongoDatabase _database;

        public HairSalonContext(IOptions<MongoDbSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            _database = client.GetDatabase(settings.Value.DatabaseName);
        }

        public IMongoCollection<Account> Accounts => _database.GetCollection<Account>("Accounts");

        public IMongoCollection<Member> Members => _database.GetCollection<Member>("Members");

    }
}
