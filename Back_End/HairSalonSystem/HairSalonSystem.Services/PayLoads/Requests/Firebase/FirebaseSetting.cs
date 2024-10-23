using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.PayLoads.Requests.Firebase
{
    public class FirebaseSetting
    {
        public string ServiceAccountKeyPath { get; set; }
        public string StorageBucket { get; set; }
        public string ProjectId { get; set; }
        public string ServiceAccountId { get; set; }
        public string CredentialPath { get; set; }  
    }
}
