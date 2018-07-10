using Microsoft.EntityFrameworkCore;
using TeachingAssistantUltimate.Model;

namespace TeachingAssistantUltimate.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=assistant.db;", x =>
            {
                x.SuppressForeignKeyEnforcement(false);
                x.UseRelationalNulls(true);
            });
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Subjects>(x => x.HasData(
                new Subjects { Subject = "Public Health Nursing", SubjectsID = 1, SubjectCode = "001" },
                new Subjects { Subject = "Basic Infection Prevention and Control", SubjectsID = 2, SubjectCode = "002" }
                ));

            builder.Entity<AssessmentTypes>(x => x.HasData(
                new AssessmentTypes { AssessmentTypesID = 1, AssessmentType = "Quiz", Total = 10 },
                new AssessmentTypes { AssessmentTypesID = 2, AssessmentType = "Assignment", Total = 10 },
                new AssessmentTypes { AssessmentTypesID = 3, AssessmentType = "Mid-Sem", Total = 20 }
                ));
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.// For example, you can rename the ASP.NET Identity table names and more.// Add your customizations after calling base.OnModelCreating(builder);
        }

        public virtual DbSet<Questions> Questions { get; set; }

        public virtual DbSet<Subjects> Subjects { get; set; }

        public virtual DbSet<Options> Options { get; set; }

        public virtual DbSet<Students> Students { get; set; }

        public virtual DbSet<Classes> Classes { get; set; }

        public virtual DbSet<AssessmentTypes> AssessmentTypes { get; set; }

        public virtual DbSet<Results> Results { get; set; }
    }
}
