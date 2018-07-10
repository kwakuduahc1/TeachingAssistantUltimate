using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeachingAssistantUltimate.Model.ViewModels
{
    public class StudentResults
    {
        public int StudentsID { get; set; }

        public string Name { get; set; }

        public List<AssResults> Results { get; set; }

        public double AssessValue { get; set; }
        public string IndexNumber { get; internal set; }
    }
}
