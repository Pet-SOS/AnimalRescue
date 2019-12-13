using AnimalRescue.DataAccess.Contracts.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Collections;
using AnimalRescue.DataAccess.Mongodb.Configurations;
using AnimalRescue.DataAccess.Mongodb.Configurations.MappingProfiles;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Repositories;
using AnimalRescue.Infrastructure.Configuration;

using AutoMapper;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using MongoDB.Driver;

using System.Collections.Generic;

namespace AnimalRescue.DataAccess.Mongodb
{
    public static class MongoDbConfigureExtension
    {
        public static void AddConfigureMongoDb(
            this IServiceCollection services, 
            IConfiguration configuration,
            List<Profile> profiles)
        {
            profiles.Add(new AnimalMappingProfile());

            var commonSettings = configuration.GetTypedSection<MongoDbSettings>(nameof(MongoDbSettings));

            services.AddSingleton<IMongoDbSettings>(p => commonSettings);

            services.AddSingleton<IMongoClient, MongoClient>(p => new MongoClient(commonSettings.ConnectionString));
            
            services.AddScoped<IAnimalRepository, AnimalCollection>();
            
            services.AddScoped<IConfigurationRepository, ConfigurationRepository>();
        }
    }
}
