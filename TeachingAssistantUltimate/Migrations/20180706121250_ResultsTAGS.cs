using Microsoft.EntityFrameworkCore.Migrations;

namespace TeachingAssistantUltimate.Migrations
{
    public partial class ResultsTAGS : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Tag",
                table: "Results",
                maxLength: 20,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Tag",
                table: "Results");
        }
    }
}
