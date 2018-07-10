using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TeachingAssistantUltimate.Migrations
{
    public partial class IndexPadding : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AssessmentTypes",
                columns: table => new
                {
                    AssessmentTypesID = table.Column<short>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AssessmentType = table.Column<string>(maxLength: 15, nullable: false),
                    Total = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssessmentTypes", x => x.AssessmentTypesID);
                });

            migrationBuilder.CreateTable(
                name: "Classes",
                columns: table => new
                {
                    ClassesID = table.Column<short>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ClassName = table.Column<string>(maxLength: 10, nullable: false),
                    IndexPrefix = table.Column<string>(maxLength: 20, nullable: false),
                    Padding = table.Column<byte>(nullable: false),
                    Concurrency = table.Column<byte[]>(rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Classes", x => x.ClassesID);
                });

            migrationBuilder.CreateTable(
                name: "Subjects",
                columns: table => new
                {
                    SubjectsID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Subject = table.Column<string>(maxLength: 250, nullable: false),
                    SubjectCode = table.Column<string>(maxLength: 10, nullable: false),
                    Concurrency = table.Column<byte[]>(rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subjects", x => x.SubjectsID);
                });

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    StudentsID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(maxLength: 100, nullable: false),
                    IndexNumber = table.Column<string>(nullable: false),
                    ClassesID = table.Column<short>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.StudentsID);
                    table.ForeignKey(
                        name: "FK_Students_Classes_ClassesID",
                        column: x => x.ClassesID,
                        principalTable: "Classes",
                        principalColumn: "ClassesID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    QuestionsID = table.Column<Guid>(nullable: false),
                    Question = table.Column<string>(maxLength: 2147483647, nullable: false),
                    Topic = table.Column<string>(maxLength: 200, nullable: false),
                    SubjectsID = table.Column<int>(nullable: false),
                    DateAdded = table.Column<DateTime>(nullable: false),
                    Concurrency = table.Column<byte[]>(rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.QuestionsID);
                    table.ForeignKey(
                        name: "FK_Questions_Subjects_SubjectsID",
                        column: x => x.SubjectsID,
                        principalTable: "Subjects",
                        principalColumn: "SubjectsID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Results",
                columns: table => new
                {
                    ResultsID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    StudentsID = table.Column<int>(nullable: false),
                    SubjectsID = table.Column<int>(nullable: false),
                    AssessmentTypesID = table.Column<short>(nullable: false),
                    Score = table.Column<double>(nullable: false),
                    TotalScore = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Results", x => x.ResultsID);
                    table.ForeignKey(
                        name: "FK_Results_AssessmentTypes_AssessmentTypesID",
                        column: x => x.AssessmentTypesID,
                        principalTable: "AssessmentTypes",
                        principalColumn: "AssessmentTypesID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Results_Students_StudentsID",
                        column: x => x.StudentsID,
                        principalTable: "Students",
                        principalColumn: "StudentsID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Results_Subjects_SubjectsID",
                        column: x => x.SubjectsID,
                        principalTable: "Subjects",
                        principalColumn: "SubjectsID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Options",
                columns: table => new
                {
                    OptionsID = table.Column<Guid>(nullable: false),
                    Option = table.Column<string>(maxLength: 250, nullable: false),
                    QuestionsID = table.Column<Guid>(nullable: false),
                    IsAnswer = table.Column<bool>(nullable: false),
                    Concurrency = table.Column<byte[]>(rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Options", x => x.OptionsID);
                    table.ForeignKey(
                        name: "FK_Options_Questions_QuestionsID",
                        column: x => x.QuestionsID,
                        principalTable: "Questions",
                        principalColumn: "QuestionsID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AssessmentTypes",
                columns: new[] { "AssessmentTypesID", "AssessmentType", "Total" },
                values: new object[] { (short)1, "Quiz", 10.0 });

            migrationBuilder.InsertData(
                table: "AssessmentTypes",
                columns: new[] { "AssessmentTypesID", "AssessmentType", "Total" },
                values: new object[] { (short)2, "Assignment", 10.0 });

            migrationBuilder.InsertData(
                table: "AssessmentTypes",
                columns: new[] { "AssessmentTypesID", "AssessmentType", "Total" },
                values: new object[] { (short)3, "Mid-Sem", 20.0 });

            migrationBuilder.InsertData(
                table: "Subjects",
                columns: new[] { "SubjectsID", "Concurrency", "Subject", "SubjectCode" },
                values: new object[] { 1, null, "Public Health Nursing", "001" });

            migrationBuilder.InsertData(
                table: "Subjects",
                columns: new[] { "SubjectsID", "Concurrency", "Subject", "SubjectCode" },
                values: new object[] { 2, null, "Basic Infection Prevention and Control", "002" });

            migrationBuilder.CreateIndex(
                name: "IX_Options_QuestionsID",
                table: "Options",
                column: "QuestionsID");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_SubjectsID",
                table: "Questions",
                column: "SubjectsID");

            migrationBuilder.CreateIndex(
                name: "IX_Results_AssessmentTypesID",
                table: "Results",
                column: "AssessmentTypesID");

            migrationBuilder.CreateIndex(
                name: "IX_Results_StudentsID",
                table: "Results",
                column: "StudentsID");

            migrationBuilder.CreateIndex(
                name: "IX_Results_SubjectsID",
                table: "Results",
                column: "SubjectsID");

            migrationBuilder.CreateIndex(
                name: "IX_Students_ClassesID",
                table: "Students",
                column: "ClassesID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Options");

            migrationBuilder.DropTable(
                name: "Results");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "AssessmentTypes");

            migrationBuilder.DropTable(
                name: "Students");

            migrationBuilder.DropTable(
                name: "Subjects");

            migrationBuilder.DropTable(
                name: "Classes");
        }
    }
}
