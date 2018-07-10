using ElectronNET.API;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using System;

namespace TeachingAssistantUltimate
{
    public class Program
    {
        public static void Main(string[] args)
        {
            if (DateTime.Now.Date > DateTime.Parse("December 31, 2018").Date)
                throw new Exception("Evaluation Period is over");
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
            .UseElectron(args)
                .Build();
    }
}
