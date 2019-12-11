using AnimalRescue.DataAccess.Mongodb.Collections;
using AnimalRescue.DataAccess.Mongodb.Configurations;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Collections;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Repositories;
using AnimalRescue.Infrastructure.Configuration;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using MongoDB.Driver;

namespace AnimalRescue.DataAccess.Mongodb
{
    public static class MongoDbConfigureExtension
    {
        public static void AddSConfigureMongoDb(this IServiceCollection services, IConfiguration configuration)
        {
            var commonSettings = configuration.GetTypedSection<MongoDbSettings>(nameof(MongoDbSettings));

            services.AddSingleton<IMongoDbSettings>(p => commonSettings);

            services.AddSingleton<IMongoClient, MongoClient>(p => new MongoClient(commonSettings.ConnectionString));
            
            services.AddScoped<IAnimalCollection, AnimalCollection>();

            services.AddScoped<IAnimalRepository, AnimalRepository>();
        }
    }
}
