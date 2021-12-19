using System;
using System.Net.Http;
using System.Text.Json;
using Migration.Runner.Providers;

namespace Migration.Runner
{
    class Program
    {
        static void Main(string[] args)
        {
            using var httpClient = new HttpClient();

            var animalsProvider = new AnimalsProvider(httpClient);

            var animalsToMigrate = animalsProvider.GetAnimals(1, false, false).Result;

            Console.WriteLine(JsonSerializer.Serialize(animalsToMigrate));
        }
    }
}
