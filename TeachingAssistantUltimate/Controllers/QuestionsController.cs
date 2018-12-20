using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeachingAssistantUltimate.Context;
using TeachingAssistantUltimate.Model;
using TeachingAssistantUltimate.Model.ViewModels;

namespace CampusConnectApp.Controllers
{
    public class QuestionsController : Controller
    {
        private readonly DbContextOptions<ApplicationDbContext> dco;

        public QuestionsController(DbContextOptions<ApplicationDbContext> options) => dco = options;

        [HttpPost]
        public async Task<IEnumerable> GetQuestions(GetQuestionsVm vm) => await new ApplicationDbContext(dco).Questions.Where(x => x.SubjectsID == vm.SubjectsID).ToListAsync();

        [HttpGet]
        public async Task<IActionResult> Find(Guid id)
        {
            var quest = await new ApplicationDbContext(dco).Questions.Select(x => new { x.Concurrency, x.DateAdded, x.Question, x.QuestionsID, x.Subjects.Subject, x.SubjectsID, x.Topic, Options = x.Options.Select(t => new { t.Concurrency, t.IsAnswer, t.Option, t.OptionsID }) }).SingleOrDefaultAsync(x => x.QuestionsID == id);
            return quest == null ? NotFound(new { Message = "Question ID was not found" }) : (IActionResult)Ok(quest);
        }

        [HttpGet]
        public async Task<IEnumerable> TopicQuestions(string topic, int sid) => await new ApplicationDbContext(dco).Questions.Where(x => x.Topic == topic && x.SubjectsID == sid).Include(x => x.Options).Select(x => new { x.Concurrency, x.DateAdded, x.Options, x.Question, x.QuestionsID, x.Subjects.Subject, x.Subjects.SubjectCode, x.Topic }).ToListAsync();

        [HttpGet]
        public async Task<IEnumerable> Topics(int id) => await new ApplicationDbContext(dco).Questions.Where(x => x.SubjectsID == id).Select(x => new { x.Topic, Number = 0 }).OrderBy(x => x.Topic).Distinct().ToListAsync();

        [HttpPost]
        public async Task<IEnumerable> Generate([FromBody]GeneratorVm vm)
        {
            var body = Request.Body;
            var questions = new List<TestVm>();
            using (var db = new ApplicationDbContext(dco))
            {
                foreach (var top in vm.Topics.Where(x => x.Number > 0).ToList())
                {
                    string qry = @"SELECT q.Question , q.QuestionsID
                                    FROM Questions q
                                    INNER JOIN Subjects s on s.SubjectsID = q.SubjectsID
                                    WHERE s.SubjectsID = @subject AND q.topic = @topic
                                    ORDER BY RANDOM() LIMIT @num ";
                    var quest = await db.Questions.FromSql(qry, new SqliteParameter("@subject", vm.SubjectsID), new SqliteParameter("@topic", top.Topic), new SqliteParameter("@num", top.Number))
                        .Select(x => new TestVm { Question = x.Question, Options = x.Options.OrderBy(t => t.Option).Select(t => t.Option) })
                        .ToListAsync();
                    questions.AddRange(quest);
                }
            }
            return questions;
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody]Questions question)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Error = "Invalid data was submitted", Message = ModelState.Values.First(x => x.Errors.Count > 0).Errors.Select(t => t.ErrorMessage).First() });
            question.QuestionsID = Guid.NewGuid();
            question.DateAdded = DateTime.Now;
            foreach (var item in question.Options)
            {
                item.IsAnswer = false;
                item.OptionsID = Guid.NewGuid();
                item.QuestionsID = question.QuestionsID;
            }
            question.Options.First().IsAnswer = true;
            using (var db = new ApplicationDbContext(dco))
            {
                if (await db.Questions.AnyAsync(x => x.Question == question.Question))
                    return BadRequest(new { Message = "Same question has been asked in the system. Kindly compose another question" });
                db.Questions.Add(question);
                await db.SaveChangesAsync();
            }
            return Created("", new { question.Question, question.Topic, question.QuestionsID, question.SubjectsID });
        }

        [HttpPost]
        public async Task<IActionResult> Edit([FromBody]Questions question)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Error = "Invalid data was submitted", Message = ModelState.Values.First(x => x.Errors.Count > 0).Errors.Select(t => t.ErrorMessage).First() });
            using (var db = new ApplicationDbContext(dco))
            {
                if (!await db.Questions.AnyAsync(x => x.QuestionsID == question.QuestionsID))
                    return BadRequest(new { Message = "Question does not exists to be edited" });
                // db.Entry(question).State = EntityState.Modified;
                db.Update(question);
                //question.Options.ToList().ForEach(x => db.Entry(x).State = EntityState.Modified);
                await db.SaveChangesAsync();
            }
            return Ok(new { question.Concurrency, question.DateAdded, question.Question, question.QuestionsID, question.SubjectsID, question.Topic, Options = question.Options.Select(x => new { x.Option, x.OptionsID }) });
        }

        [HttpPost]
        public async Task<IActionResult> Delete([FromBody]Questions question)
        {
            using (var db = new ApplicationDbContext(dco))
            {
                if (!await db.Questions.AnyAsync(x => x.QuestionsID == question.QuestionsID))
                    return BadRequest(new { Message = "Question does not exists to be deleted" });
                db.Entry(question).State = EntityState.Deleted;
                question.Options.ToList().ForEach(x => db.Entry(x).State = EntityState.Deleted);
                await db.SaveChangesAsync();
            }
            return Ok();
        }
    }
}