using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using AnimalRescue.DataAccess.Mongodb;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using AnimalRescue.Infrastructure.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Migration.Runner.Configurations;
using Migration.Runner.Models;
using Migration.Runner.Providers;

namespace Migration.Runner
{
    class Program
    {
        static void Main(string[] args)
        {
            var config = ConfigurationUtil.GetConfiguration();
            var importConfig = config.GetTypedSection<ImportConfiguration>(nameof(ImportConfiguration));

            var serviceCollection = new ServiceCollection();

            serviceCollection.AddConfigureMongoDb(config);

            using var serviceProvider = serviceCollection.BuildServiceProvider();

            var animalRepository = serviceProvider.GetService<IBaseRepository<Animal>>();
            var sequenceRepository = serviceProvider.GetService<ISequenceRepository>();

            using var httpClient = new HttpClient();

            var animalsProvider = new AnimalsProvider(httpClient);

            var animalsToMigrate = animalsProvider.GetAnimals(importConfig.Limit, importConfig.IncludeDeleted, importConfig.IncludeInactive).Result;
            var seq = GetOrCreateSeq(sequenceRepository);

            foreach (var animal in animalsToMigrate)
            {
                seq.Number += 1;
                animalRepository.CreateAsync(Map(animal, seq.Number)).Wait();
            }

            sequenceRepository.UpdateAsync(seq);
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

        private static Animal Map(AnimalV0 animal, int number)
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
                IsDeletable = true
            };
        }
    }
}
