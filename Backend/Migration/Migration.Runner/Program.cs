using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using AnimalRescue.DataAccess.Mongodb;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using AnimalRescue.Infrastructure.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Migration.Runner.Configurations;
using Migration.Runner.Models;
using Migration.Runner.Providers;
using Migration.Runner.Services;

namespace Migration.Runner
{
    class Program
    {
        static void Main(string[] args)
        {
            using var serviceProvider = GetServiceProvider();

            var animalsProvider = serviceProvider.GetService<IAnimalsProvider>();
            var animalSerivce = serviceProvider.GetService<IAnimalSerivce>();

            var animalsToMigrate = animalsProvider.GetAnimals().Result;
            animalSerivce.Create(animalsToMigrate).Wait();
        }

        private static ServiceProvider GetServiceProvider()
        {
            var config = ConfigurationUtil.GetConfiguration();
            var importConfig = config.GetTypedSection<ImportConfiguration>(nameof(ImportConfiguration));
            var imageSizes = new ImageSizeConfiguration(config);

            var serviceCollection = new ServiceCollection();

            serviceCollection.AddConfigureMongoDb(config);
            serviceCollection.AddSingleton(imageSizes);
            serviceCollection.AddSingleton(importConfig);
            serviceCollection.AddTransient<IImageService, ImageService>();
            serviceCollection.AddSingleton(new HttpClient());
            serviceCollection.AddTransient<IAnimalsProvider, AnimalsProvider>();
            serviceCollection.AddTransient<IAnimalSerivce, AnimalService>();

            return serviceCollection.BuildServiceProvider();
        }
    }
}
