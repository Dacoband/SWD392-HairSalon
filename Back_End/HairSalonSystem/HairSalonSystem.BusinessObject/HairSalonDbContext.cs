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

        public HairSalonContext(string connectionString, string databaseName)
        {
            var client = new MongoClient(connectionString);
            _database = client.GetDatabase(databaseName);
        }

        public IMongoCollection<Account> Accounts => _database.GetCollection<Account>("Accounts");

        public IMongoCollection<Member> Members => _database.GetCollection<Member>("Members");
        public IMongoCollection<Branch> Branchs => _database.GetCollection<Branch>("Branchs");
        public IMongoCollection<StaffManager> StaffManagers => _database.GetCollection<StaffManager>("StaffManagers");
        public IMongoCollection<Notifications> Notifications => _database.GetCollection<Notifications>("Notifications");
        public IMongoCollection<StaffStylist> StaffStylists => _database.GetCollection<StaffStylist>("StaffStylists");
        public IMongoCollection<Stylist> Stylists => _database.GetCollection<Stylist>("Stylists");
        public IMongoCollection<SalaryStylist> SalaryStylist => _database.GetCollection<SalaryStylist>("SalaryStylists");


    }
}
