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
        private static HttpClient _httpClient;

        static void Main(string[] args)
        {
            var config = ConfigurationUtil.GetConfiguration();
            var importConfig = config.GetTypedSection<ImportConfiguration>(nameof(ImportConfiguration));
            var imageSizes = new ImageSizeConfiguration(config);

            var serviceCollection = new ServiceCollection();

            serviceCollection.AddConfigureMongoDb(config);
            serviceCollection.AddSingleton(imageSizes);
            serviceCollection.AddTransient<IImageService, ImageService>();

            using var serviceProvider = serviceCollection.BuildServiceProvider();

            var animalRepository = serviceProvider.GetService<IBaseRepository<Animal>>();
            var sequenceRepository = serviceProvider.GetService<ISequenceRepository>();
            var imageService = serviceProvider.GetService<IImageService>();

            _httpClient = new HttpClient();

            var animalsProvider = new AnimalsProvider(_httpClient, importConfig);

            var animalsToMigrate = animalsProvider.GetAnimals().Result;
            var seq = GetOrCreateSeq(sequenceRepository);

            foreach (var animal in animalsToMigrate)
            {
                seq.Number += 1;

                var images = DownloadAndSaveImages(animal, importConfig.Url, imageService).Result;
                animalRepository.CreateAsync(Map(animal, seq.Number, images)).Wait();
            }

            sequenceRepository.UpdateAsync(seq);

            _httpClient.Dispose();
        }

        private static Sequence GetOrCreateSeq(ISequenceRepository rep)
        {
            var seq = rep.GetAsync().Result;

            if (seq == null)
            {
                seq = new Sequence
                {
                    Number = 1
                };

                rep.CreateAsync(seq).Wait();
            }

            return seq;
        }

        private static Animal Map(AnimalV0 animal, int number, IEnumerable<string> images)
        {
            return new Animal
            {
                Number = number,
                LocationName = animal.Location,
                Names = new List<LanguageValue>
                {
                    new LanguageValue
                    {
                        Lang = "ru",
                        Value = animal.Name
                    }
                },
                KindOfAnimal = animal.Type + "\n" + animal.Breed + "\n" + animal.Color,
                Gender = animal.Sex,
                Birthday = animal.Birthday.Date,
                AdoptivePhone = animal.Phone,
                Description = new List<LanguageValue>
                {
                    new LanguageValue
                    {
                        Lang = "ru",
                        Value = animal.Description
                    }
                },
                IsDeleted = animal.Deleted,
                IsDeletable = true,
                ImageIds = images.ToList()
            };
        }

        private static async Task<IEnumerable<string>> DownloadAndSaveImages(AnimalV0 animal, string baseUrl, IImageService imageService)
        {
            var list = new List<string>();

            var imageUrl = $"{baseUrl}/{animal.Preview}";

            using var imageResponse = await _httpClient.GetAsync(imageUrl);

            var imageName = animal.Preview.Split("/").LastOrDefault();
            var contentType = imageResponse.Content.Headers.GetValues("Content-Type").FirstOrDefault();

            var id = await imageService.Create(await imageResponse.Content.ReadAsStreamAsync(), imageName, contentType);

            list.Add(id);

            return list;
        }
    }
}
