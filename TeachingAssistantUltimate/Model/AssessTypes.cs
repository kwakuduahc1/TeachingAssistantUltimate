using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TeachingAssistantUltimate.Model
{
    public class AssessmentTypes
    {
        [Key]
        public short AssessmentTypesID { get; set; }

        [Required, StringLength(15, MinimumLength = 3)]
        public string AssessmentType { get; set; }

        [Required]
        [Range(5, 70)]
        public double Total { get; set; }

        public virtual ICollection<Results> Results { get; set; }
    }
}
