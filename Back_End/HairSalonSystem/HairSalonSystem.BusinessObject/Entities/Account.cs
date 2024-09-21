using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.BusinessObject.Entities
{
    public class Account
    {
        [Key]
        public Guid Id { get; set; }
        [StringLength(20)]
        public string RoleName { get; set; }
        public string Email { get; set; }
        [StringLength(180)]
        public string Password { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? InsDate { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdDate { get; set; }
        public bool? DelFlg { get; set; }
    }
}
