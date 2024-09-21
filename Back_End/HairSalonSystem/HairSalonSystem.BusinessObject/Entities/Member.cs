using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.BusinessObject.Entities
{
    public class Member
    {
        [Key]
        public Guid MemberId { get; set; }

        [ForeignKey("Account")]
        public Guid AccountId { get; set; }
        [StringLength(100)]
        public required string MemberName { get; set; }
        public DateTime DateOfBirth { get; set; }
        [StringLength(10, MinimumLength = 10)] 
        public required string PhoneNumber { get; set; }
        public required string Address { get; set; }
        public string AvatarImage { get; set; }


        // Assuming there is a navigation property for Account
        [InverseProperty("Member")]
        public virtual ICollection<Account> Account { get; set; } = new List<Account>();
    }
}
