using AnimalRescue.DataAccess.Mongodb.Collections;
using AnimalRescue.DataAccess.Mongodb.Configurations;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.Infrastructure.Configuration;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using MongoDB.Driver;

namespace AnimalRescue.DataAccess.Mongodb
{
    public static class MongoDbExtension
    {
        public static void AddSConfigureMongoDb(this IServiceCollection services, IConfiguration configuration)
        {
            var commonSettings = configuration
                .GetTypedSection<Configurations.MongoDatabaseSettings>(nameof(Configurations.MongoDatabaseSettings));

            services.AddSingleton<IMongoDatabaseSettings>(p => commonSettings);

            services.AddSingleton<IMongoClient, MongoClient>(p => new MongoClient(commonSettings.ConnectionString));
            
            services.AddScoped<IAnimalCollection, AnimalCollection>();
        }
    }
}
