using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeachingAssistantUltimate.Context;
using TeachingAssistantUltimate.Model;
using TeachingAssistantUltimate.Model.ViewModels;

namespace TeachingAssistantUltimate.Controllers
{
    public class ResultsController : Controller
    {
        private readonly DbContextOptions<ApplicationDbContext> dco;

        public ResultsController(DbContextOptions<ApplicationDbContext> options) => dco = options;

        [HttpGet]
        public async Task<IEnumerable> ClassSubjects(short id) => await new ApplicationDbContext(dco).Results.Where(x => x.Students.ClassesID == id).Select(x => new { x.SubjectsID, x.Subjects.Subject, x.Subjects.SubjectCode }).Distinct().ToListAsync();

        [HttpGet]
        public async Task<IEnumerable> Tags(int cid) => await new ApplicationDbContext(dco).Results.Where(x => x.Students.ClassesID == cid).Select(x => new { x.Tag, x.AssessmentTypes.AssessmentType, x.AssessmentTypesID, x.TotalScore }).Distinct().ToListAsync();

        [HttpGet]
        public async Task<IEnumerable> TagResults(string tag, int cid, int sid) => await new ApplicationDbContext(dco).Results.Where(x => x.Tag == tag && x.Students.ClassesID == cid && x.SubjectsID == sid).Select(x => new
        {
            x.AssessmentTypes.AssessmentType,
            x.AssessmentTypesID,
            x.ResultsID,
            x.Score,
            x.Students.IndexNumber,
            x.Students.Name,
            x.StudentsID,
            x.SubjectsID,
            x.TotalScore,
            x.Subjects.SubjectCode,
            x.Subjects.Subject,
            x.Tag
        }).ToListAsync();

        [HttpGet]
        public async Task<IActionResult> Find(int id)
        {
            var subj = await new ApplicationDbContext(dco).Results.Select(x => new
            {
                x.AssessmentTypes.AssessmentType,
                x.AssessmentTypesID,
                x.ResultsID,
                x.Score,
                x.Students.IndexNumber,
                x.Students.Name,
                x.StudentsID,
                x.SubjectsID,
                x.TotalScore,
                x.Subjects.SubjectCode,
                x.Subjects.Subject
            }).SingleOrDefaultAsync(x => x.ResultsID == id);
            if (subj == null)
                return NotFound();
            return Ok(subj);
        }

        [HttpGet]
        public async Task<IActionResult> List(int cid, int sid)
        {
            List<StudentResults> disp = new List<StudentResults>();
            List<Results> results = new List<Results>();
            using (var db = new ApplicationDbContext(dco))
            {
                results = await db.Results.Where(x => x.Students.ClassesID == cid && x.SubjectsID == sid).Include(x => x.Students).Include(x => x.AssessmentTypes).ToListAsync();
            }
            var types = results.Select(x => new { x.AssessmentTypes.AssessmentType, x.AssessmentTypesID, x.AssessmentTypes.Total }).Distinct();
            var stds = results.Select(x => x.Students).ToList();
            foreach (var std in stds.Distinct())
            {
                var studentResults = new StudentResults
                {
                    Name = std.Name,
                    IndexNumber = std.IndexNumber,
                    StudentsID = std.StudentsID,
                    Results = new List<AssResults>()
                };
                foreach (var item in types)
                {
                    var res = results.Where(x => x.StudentsID == std.StudentsID && x.AssessmentTypesID == item.AssessmentTypesID).GroupBy(x => new
                    {
                        x.AssessmentTypes.AssessmentType,
                        x.AssessmentTypesID,
                    }, (k, v) => new AssResults
                    {
                        AssessmentType = k.AssessmentType,
                        AssessmentTypesID = k.AssessmentTypesID,
                        SumScore = v.Sum(x => x.Score),
                        SumTotal = v.Sum(x => x.TotalScore),
                        AssessmentTotal = item.Total

                    }).SingleOrDefault();
                    studentResults.Results.Add(res);
                }
                disp.Add(studentResults);
            }

            return Ok(new { results = disp.OrderBy(x => x.Name), types });
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]List<Results> results)
        {
            if (ModelState.IsValid)
            {
                using (var db = new ApplicationDbContext(dco))
                {
                    db.AddRange(results);
                    await db.SaveChangesAsync();
                    return Created($"/Results/List", results);
                }
            }
            return BadRequest(new { Error = "Invalid data was submitted", Message = ModelState.Values.First(x => x.Errors.Count > 0).Errors.Select(t => t.ErrorMessage).First() });
        }

        [HttpPost]
        public async Task<IActionResult> Edit([FromBody]Results results)
        {
            if (ModelState.IsValid)
            {
                using (var db = new ApplicationDbContext(dco))
                {
                    if (!await db.Results.AnyAsync(x => x.ResultsID == results.ResultsID))
                        return BadRequest(new { Message = "No results was found matching the details provided" });
                    db.Entry(results).State = EntityState.Modified;
                    await db.SaveChangesAsync();
                }
                return Ok(results);
            }
            return BadRequest(new { Error = "Invalid data was submitted", Message = ModelState.Values.First(x => x.Errors.Count > 0).Errors.Select(t => t.ErrorMessage).First() });
        }

        [HttpPost]
        public async Task<IActionResult> Delete([FromBody]Subjects subject)
        {
            if (ModelState.IsValid)
            {
                using (var db = new ApplicationDbContext(dco))
                {
                    if (!await db.Subjects.AnyAsync(x => x.SubjectsID == subject.SubjectsID))
                        return BadRequest(new { Message = "No results was found matching the details provided" });
                    db.Entry(subject).State = EntityState.Deleted;
                    await db.SaveChangesAsync();
                }
                return Ok(new { message = "Results deleted" });
            }
            return BadRequest(new { Error = "Invalid data was submitted", Message = ModelState.Values.First(x => x.Errors.Count > 0).Errors.Select(t => t.ErrorMessage).First() });
        }
    }
}