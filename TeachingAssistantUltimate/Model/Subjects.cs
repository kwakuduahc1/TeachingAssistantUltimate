using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TeachingAssistantUltimate.Model
{
    public class Subjects
    {
        public int SubjectsID { get; set; }

        [Required]
        [StringLength(250, MinimumLength = 5)]
        public string Subject { get; set; }

        [Required]
        [StringLength(10, MinimumLength = 3)]
        public string SubjectCode { get; set; }

        [Timestamp, ConcurrencyCheck]
        public byte[] Concurrency { get; set; }

        public virtual ICollection<Questions> Questions { get; set; }

        public virtual ICollection<Results> Results { get; set; }
    }
}
