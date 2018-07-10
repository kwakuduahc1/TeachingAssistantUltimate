namespace TeachingAssistantUltimate.Model.ViewModels
{
    public class ResultsDisplayVm
    {
        public int StudentsID { get; set; }

        public string Name { get; set; }

        public int AssessmentTypesID { get; set; }

        public string AssessmentType { get; set; }

        public double SumScore { get; set; }

        public double SumTotal { get; set; }

        public double Total { get; set; }

        public double Score => SumScore / SumTotal;

        public double ConvertedScore => Score * Total;
    }
}
