using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Responses.Accounts
{
    public class UpdateAccountResponse
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
