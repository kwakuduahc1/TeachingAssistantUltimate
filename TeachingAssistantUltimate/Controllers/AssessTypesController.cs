using System.Collections;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeachingAssistantUltimate.Context;
using TeachingAssistantUltimate.Model;

namespace TeachingAssistantUltimate.Controllers
{
    public class AssessTypesController : Controller
    {
        private readonly DbContextOptions<ApplicationDbContext> dco;

        public AssessTypesController(DbContextOptions<ApplicationDbContext> options) => dco = options;

        [HttpGet]
        public async Task<IActionResult> Find(byte id)
        {
            var subj = await new ApplicationDbContext(dco).AssessmentTypes.Select(x => new
            {
                x.AssessmentType,
                x.AssessmentTypesID,
                x.Total
            }).SingleOrDefaultAsync(x => x.AssessmentTypesID == id);
            if (subj == null)
                return NotFound();
            return Ok(subj);
        }

        [HttpGet]
        public async Task<IEnumerable> List() => await new ApplicationDbContext(dco).AssessmentTypes.Select(x => new { x.AssessmentTypesID, x.AssessmentType, x.Total }).ToListAsync();

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]AssessmentTypes assessment)
        {
            if (ModelState.IsValid)
            {
                using (var db = new ApplicationDbContext(dco))
                {
                    if (await db.AssessmentTypes.AnyAsync(x => x.AssessmentType == assessment.AssessmentType))
                        return BadRequest(new { Message = "You have already saved this item" });
                    db.Add(assessment);
                    await db.SaveChangesAsync();
                    return Created($"/AssessTypes/Find/id={assessment.AssessmentTypesID}", assessment);
                }
            }
            return BadRequest(new { Error = "Invalid data was submitted", Message = ModelState.Values.First(x => x.Errors.Count > 0).Errors.Select(t => t.ErrorMessage).First() });
        }

        [HttpPost]
        public async Task<IActionResult> Edit([FromBody]AssessmentTypes assessment)
        {
            if (ModelState.IsValid)
            {
                using (var db = new ApplicationDbContext(dco))
                {
                    if (!await db.AssessmentTypes.AnyAsync(x => x.AssessmentTypesID == assessment.AssessmentTypesID))
                        return BadRequest(new { Message = "Class does not exists" });
                    db.Entry(assessment).State = EntityState.Modified;
                    await db.SaveChangesAsync();
                }
                return Ok(assessment);
            }
            return BadRequest(new { Error = "Invalid data was submitted", Message = ModelState.Values.First(x => x.Errors.Count > 0).Errors.Select(t => t.ErrorMessage).First() });
        }

        [HttpPost]
        public async Task<IActionResult> Delete([FromBody]AssessmentTypes assessment)
        {
            if (ModelState.IsValid)
            {
                using (var db = new ApplicationDbContext(dco))
                {
                    if (!await db.AssessmentTypes.AnyAsync(x => x.AssessmentTypesID == assessment.AssessmentTypesID))
                        return BadRequest(new { Message = "Class was not found" });
                    db.Entry(assessment).State = EntityState.Deleted;
                    await db.SaveChangesAsync();
                }
                return Ok(new { message = "Class deleted" });
            }
            return BadRequest(new { Error = "Invalid data was submitted", Message = ModelState.Values.First(x => x.Errors.Count > 0).Errors.Select(t => t.ErrorMessage).First() });
        }
    }
}