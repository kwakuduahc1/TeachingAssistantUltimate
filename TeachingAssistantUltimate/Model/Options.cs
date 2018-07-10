using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace TeachingAssistantUltimate.Model
{
    public class Options
    {
        [Key()]
        public Guid OptionsID { get; set; }

        [StringLength(250)]
        [Required(AllowEmptyStrings = false)]
        public string Option { get; set; }

        [Required]
        public Guid QuestionsID { get; set; }

        [DefaultValue(false)]
        public bool IsAnswer { get; set; }

        [Timestamp, ConcurrencyCheck]
        public byte[] Concurrency { get; set; }

        public virtual Questions Questions { get; set; }
    }
}