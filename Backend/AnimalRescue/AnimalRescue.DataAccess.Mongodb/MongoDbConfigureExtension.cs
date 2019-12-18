using AnimalRescue.DataAccess.Contracts.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Collections;
using AnimalRescue.DataAccess.Mongodb.Configurations;
using AnimalRescue.DataAccess.Mongodb.Configurations.MappingProfiles;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.QueryBuilders;
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
			profiles.Add(new CmsConfigurationMappingProfile());

            var commonSettings = configuration.GetTypedSection<MongoDbSettings>(nameof(MongoDbSettings));
            MongoClient client = new MongoClient(commonSettings.ConnectionString);
            IMongoDatabase database = client.GetDatabase(commonSettings.DatabaseName);

            services
                .AddSingleton<IMongoDbSettings>(p => commonSettings)
                .AddSingleton<IBucketSettings>(p => commonSettings)
                .AddSingleton<IMongoClient, MongoClient>(p => client)
                .AddSingleton<IQueryFilterBuilder, QueryFilterBuilder>()
                .AddSingleton<IQuerySortBuilder, QuerySortBuilder>()
                .AddSingleton<IQueryBuilder<Animal>, QueryBuilder<Animal>>()
                .AddSingleton<IQueryBuilder<Blog>, QueryBuilder<Blog>>()
                .AddSingleton<IQueryBuilder<Configuration<CmsConfigurationNested>>, QueryBuilder<Configuration<CmsConfigurationNested>>>()
                ;

            services
                .AddScoped<IMongoDatabase>(x => database)
                .AddScoped<IBucket, Bucket>()
                .AddScoped<IAnimalRepository, AnimalCollection>()
                .AddScoped<IConfigurationRepository, ConfigurationRepository>()
                .AddScoped<IBlogRepository, BlogRepository>();
		}
    }
}
