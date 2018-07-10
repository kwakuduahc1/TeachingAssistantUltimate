using System.Collections;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeachingAssistantUltimate.Context;
using TeachingAssistantUltimate.Model;

namespace TeachingAssistantUltimate.Controllers
{
    public class SubjectsController : Controller
    {
        private readonly DbContextOptions<ApplicationDbContext> dco;

        public SubjectsController(DbContextOptions<ApplicationDbContext> options) => dco = options;

        [HttpGet]
        public async Task<IActionResult> Find(int id)
        {
            var subj = await new ApplicationDbContext(dco).Subjects.Select(x => new
            {
                x.SubjectsID,
                x.Questions.Count,
                x.Subject,
                x.SubjectCode,
                x.Concurrency,
                Topics = x.Questions.Select(t => t.Topic).Distinct()
            }).SingleOrDefaultAsync(x => x.SubjectsID == id);
            if (subj == null)
                return NotFound();
            return Ok(subj);
        }

        [HttpGet]
        public async Task<IEnumerable> List()
        {
            using (var db = new ApplicationDbContext(dco))
            {
                return await db.Subjects.Select(x => new { x.Concurrency, x.SubjectCode, x.Questions.Count, x.Subject, x.SubjectsID, Topics = x.Questions.Select(t => t.Topic).Distinct().ToList() })
                    .ToListAsync();
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody, Bind("Subject")]Subjects subject)
        {
            if (ModelState.IsValid)
            {
                using (var db = new ApplicationDbContext(dco))
                {
                    if (await db.Subjects.AnyAsync(x => x.Subject == subject.Subject))
                        return BadRequest(new { Message = "You have already saved this subject" });
                    db.Add(subject);
                    await db.SaveChangesAsync();
                    return Created($"/Subjects/Find/id={subject.SubjectsID}", subject);
                }
            }
            return BadRequest(new { Error = "Invalid data was submitted", Message = ModelState.Values.First(x => x.Errors.Count > 0).Errors.Select(t => t.ErrorMessage).First() });
        }

        [HttpPost]
        public async Task<IActionResult> Edit([FromBody]Subjects subject)
        {
            if (ModelState.IsValid)
            {
                using (var db = new ApplicationDbContext(dco))
                {
                    db.Entry(subject).State = EntityState.Modified;
                    await db.SaveChangesAsync();
                }
                return Ok(subject);
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
                        return BadRequest(new { Message = "Subject was not found" });
                    db.Entry(subject).State = EntityState.Deleted;
                    await db.SaveChangesAsync();
                }
                return Ok(new { message = "Subject deleted" });
            }
            return BadRequest(new { Error = "Invalid data was submitted", Message = ModelState.Values.First(x => x.Errors.Count > 0).Errors.Select(t => t.ErrorMessage).First() });
        }
    }
}