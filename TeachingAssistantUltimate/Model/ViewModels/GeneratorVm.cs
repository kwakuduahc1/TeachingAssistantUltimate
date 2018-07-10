using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TeachingAssistantUltimate.Model.ViewModels
{
    public class GeneratorVm
    {
        [Required]
        public int SubjectsID { get; set; }

        public IList<TopicsVm> Topics { get; set; }
    }

    public class TopicsVm
    {
        [Required]
        public string Topic { get; set; }

        [Required]
        public byte Number { get; set; }

    }
}
