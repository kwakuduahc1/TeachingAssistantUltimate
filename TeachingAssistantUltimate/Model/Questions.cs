using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TeachingAssistantUltimate.Model
{
    public class Questions
    {
        [Key]
        public Guid QuestionsID { get; set; }

        [StringLength(int.MaxValue, MinimumLength = 10)]
        [Required(AllowEmptyStrings = false)]
        public string Question { get; set; }

        [Required]
        [StringLength(200)]
        public string Topic { get; set; }

        [Required]
        public int SubjectsID { get; set; }

        public DateTime DateAdded { get; set; }

        [Timestamp, ConcurrencyCheck]
        public byte[] Concurrency { get; set; }

        public virtual ICollection<Options> Options { get; set; }

        public virtual Subjects Subjects { get; set; }
    }
}
