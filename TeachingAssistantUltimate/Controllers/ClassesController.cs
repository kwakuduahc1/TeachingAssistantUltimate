using System.Collections;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeachingAssistantUltimate.Context;
using TeachingAssistantUltimate.Model;

namespace TeachingAssistantUltimate.Controllers
{
    public class ClassesController : Controller
    {
        private readonly DbContextOptions<ApplicationDbContext> dco;

        public ClassesController(DbContextOptions<ApplicationDbContext> options) => dco = options;

        [HttpGet]
        public async Task<IActionResult> Find(int id)
        {
            var subj = await new ApplicationDbContext(dco).Classes.Select(x => new
            {
                x.ClassesID,
                x.IndexPrefix,
                x.ClassName,
                x.Students.Count,
                x.Padding,
                x.Concurrency,
            }).SingleOrDefaultAsync(x => x.ClassesID == id);
            if (subj == null)
                return NotFound();
            return Ok(subj);
        }

        [HttpGet]
        public async Task<IEnumerable> List() => await new ApplicationDbContext(dco).Classes.Select(x => new { x.Concurrency, x.Students.Count, x.ClassName, x.ClassesID, x.IndexPrefix, x.Padding }).ToListAsync();

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]Classes classes)
        {
            if (ModelState.IsValid)
            {
                using (var db = new ApplicationDbContext(dco))
                {
                    if (await db.Classes.AnyAsync(x => x.ClassName == classes.ClassName))
                        return BadRequest(new { Message = "You have already saved this class name" });
                    db.Add(classes);
                    await db.SaveChangesAsync();
                    return Created($"/Classes/Find/id={classes.ClassesID}", classes);
                }
            }
            return BadRequest(new { Error = "Invalid data was submitted", Message = ModelState.Values.First(x => x.Errors.Count > 0).Errors.Select(t => t.ErrorMessage).First() });
        }

        [HttpPost]
        public async Task<IActionResult> Edit([FromBody]Classes classes)
        {
            if (ModelState.IsValid)
            {
                using (var db = new ApplicationDbContext(dco))
                {
                    if (!await db.Classes.AnyAsync(x => x.ClassesID == classes.ClassesID))
                        return BadRequest(new { Message = "Class does not exists" });
                    db.Entry(classes).State = EntityState.Modified;
                    await db.SaveChangesAsync();
                }
                return Ok(classes);
            }
            return BadRequest(new { Error = "Invalid data was submitted", Message = ModelState.Values.First(x => x.Errors.Count > 0).Errors.Select(t => t.ErrorMessage).First() });
        }

        [HttpPost]
        public async Task<IActionResult> Delete([FromBody]Classes classes)
        {
            if (ModelState.IsValid)
            {
                using (var db = new ApplicationDbContext(dco))
                {
                    if (!await db.Classes.AnyAsync(x => x.ClassesID == classes.ClassesID))
                        return BadRequest(new { Message = "Class was not found" });
                    db.Entry(classes).State = EntityState.Deleted;
                    await db.SaveChangesAsync();
                }
                return Ok(new { message = "Class deleted" });
            }
            return BadRequest(new { Error = "Invalid data was submitted", Message = ModelState.Values.First(x => x.Errors.Count > 0).Errors.Select(t => t.ErrorMessage).First() });
        }
    }
}