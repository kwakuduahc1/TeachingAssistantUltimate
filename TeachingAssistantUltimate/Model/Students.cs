using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TeachingAssistantUltimate.Model
{
    public class Students
    {
        [Key]
        public int StudentsID { get; set; }

        [Required, StringLength(100, MinimumLength = 5)]
        public string Name { get; set; }

        [Required]
        public string IndexNumber { get; set; }

        [Required]
        public short ClassesID { get; set; }

        public virtual Classes Classes { get; set; }

        public virtual ICollection<Results> Results { get; set; }
    }
}
