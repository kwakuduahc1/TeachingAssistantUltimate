using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeachingAssistantUltimate.Context;
using TeachingAssistantUltimate.Model;

namespace TeachingAssistantUltimate.Controllers
{
    public class StudentsController : Controller
    {
        private readonly DbContextOptions<ApplicationDbContext> dco;

        public StudentsController(DbContextOptions<ApplicationDbContext> options) => dco = options;

        [HttpGet]
        public async Task<IActionResult> Find(int id)
        {
            var subj = await new ApplicationDbContext(dco).Students.Select(x => new
            {
                x.Classes.ClassName,
                x.Name,
                x.ClassesID,
                x.StudentsID
            }).SingleOrDefaultAsync(x => x.StudentsID == id);
            if (subj == null)
                return NotFound();
            return Ok(subj);
        }

        [HttpGet]
        public async Task<IEnumerable> List(int id) => await new ApplicationDbContext(dco).Students.Where(x => x.ClassesID == id).Select(x => new { x.Classes.ClassName, x.Name, x.ClassesID, x.StudentsID, x.IndexNumber }).ToListAsync();


        [HttpPost]
        public async Task<IActionResult> Create([FromBody]List<Students> stds)
        {
            if (ModelState.IsValid)
            {
                using (var db = new ApplicationDbContext(dco))
                {
                    if (await db.Students.Where(x => x.ClassesID == stds.First().ClassesID).AnyAsync(x => stds.Any(t => t.IndexNumber == x.IndexNumber)))
                        return BadRequest(new { Message = "Operation aborted because an index number was found already in the database" });
                    db.AddRange(stds);
                    await db.SaveChangesAsync();
                    return Created($"/Students/List/id={stds.First().ClassesID}", stds.OrderBy(x => x.IndexNumber));
                }
            }
            return BadRequest(new { Error = "Invalid data was submitted", Message = ModelState.Values.First(x => x.Errors.Count > 0).Errors.Select(t => t.ErrorMessage).First() });
        }

        [HttpPost]
        public async Task<IActionResult> Edit([FromBody]Students std)
        {
            if (ModelState.IsValid)
            {
                using (var db = new ApplicationDbContext(dco))
                {
                    if (!await db.Students.AnyAsync(x => x.StudentsID == std.StudentsID))
                        return BadRequest(new { Message = "No student was found with details provided" });
                    db.Entry(std).State = EntityState.Modified;
                    await db.SaveChangesAsync();
                }
                return Ok(std);
            }
            return BadRequest(new { Error = "Invalid data was submitted", Message = ModelState.Values.First(x => x.Errors.Count > 0).Errors.Select(t => t.ErrorMessage).First() });
        }

        [HttpPost]
        public async Task<IActionResult> Delete([FromBody]Students std)
        {
            if (ModelState.IsValid)
            {
                using (var db = new ApplicationDbContext(dco))
                {
                    if (!await db.Students.AnyAsync(x => x.StudentsID == std.StudentsID))
                        return BadRequest(new { Message = "No student was found with details provided" });
                    db.Entry(std).State = EntityState.Deleted;
                    await db.SaveChangesAsync();
                }
                return Ok(new { message = "Student removed from list" });
            }
            return BadRequest(new { Error = "Invalid data was submitted", Message = ModelState.Values.First(x => x.Errors.Count > 0).Errors.Select(t => t.ErrorMessage).First() });
        }
    }
}