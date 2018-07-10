using System.ComponentModel.DataAnnotations;

namespace TeachingAssistantUltimate.Model.ViewModels
{
    public class GetQuestionsVm
    {
        [Required]
        public string ID { get; set; }

        [Required]
        public short SubjectsID { get; set; }
    }
}
