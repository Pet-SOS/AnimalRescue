using AnimalRescue.DataAccess.Mongodb.Configurations;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested;
using AnimalRescue.DataAccess.Mongodb.QueryBuilders;
using AnimalRescue.DataAccess.Mongodb.Repositories;
using AnimalRescue.Infrastructure.Configuration;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using MongoDB.Driver;

namespace AnimalRescue.DataAccess.Mongodb
{
    public static class MongoDbConfigureExtension
	{
		public static void AddConfigureMongoDb(
			this IServiceCollection services,
			IConfiguration configuration)
		{
            var commonSettings = configuration.GetTypedSection<MongoDbSettings>(nameof(MongoDbSettings));
            MongoClient client = new MongoClient(commonSettings.ConnectionString);
            IMongoDatabase database = client.GetDatabase(commonSettings.DatabaseName);

            services
                .AddSingleton<IMongoDbSettings>(p => commonSettings)
                .AddSingleton<IBucketSettings>(p => commonSettings)
                .AddSingleton<IMongoClient, MongoClient>(p => client)
                .AddSingleton<IAliasStore, AliasStore>()
                .AddSingleton<IQueryFilterBuilder, QueryFilterBuilder>()
                .AddSingleton<IQuerySortBuilder, QuerySortBuilder>()
                .AddSingleton<IQueryBuilder<Animal>, QueryBuilder<Animal>>()
                .AddSingleton<IQueryBuilder<Article>, QueryBuilder<Article>>()
                .AddSingleton<IQueryBuilder<Configuration<Contacts>>, QueryBuilder<Configuration<Contacts>>>();

            services
                .AddScoped<IMongoDatabase>(x => database)
                .AddScoped<IBucket, Bucket>()
                .AddScoped<IBaseCollection<Animal>, BaseCollection<Animal>>()
                .AddScoped<IBaseCollection<Article>, BaseCollection<Article>>()
                .AddScoped<IBaseCollection<Configuration<Contacts>>, BaseCollection<Configuration<Contacts>>>()
                .AddScoped<IAnimalRepository, AnimalRepository>()
                .AddScoped<IConfigurationRepository, ConfigurationRepository>()
                .AddScoped<IArticleRepository, ArticleRepository>();
		}
    }
}
