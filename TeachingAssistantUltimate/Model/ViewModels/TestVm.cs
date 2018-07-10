using System.Collections.Generic;

namespace TeachingAssistantUltimate.Model.ViewModels
{
    public class TestVm
    {
        public string Question { get; set; }

        public IEnumerable<string> Options { get; set; }
    }
}
