using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.DataAccess.Mongodb.Extensions;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested;
using AnimalRescue.Infrastructure.Validation;

using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;

using System;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

using baseItem = AnimalRescue.Contracts.Common.Constants.PropertyConstants.BaseItem;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class ConfigurationRepository : IConfigurationRepository
    {
        private readonly IBaseCollection<Configuration<Contacts>> baseCollection;

        public ConfigurationRepository(IBaseCollection<Configuration<Contacts>> baseCollection)
        {
            Require.Objects.NotNull(baseCollection, nameof(baseCollection));

            this.baseCollection = baseCollection;
        }

        public async Task<Configuration<T>> GetConfigurationAsync<T>()
        {
            var configName = TryGetConfigName<T>();

            var filter = common.Name.EQ(configName);

            var data = await baseCollection.NativeCollection
                .Find(filter)
                .Sort(Builders<BsonDocument>.Sort.Descending(baseItem.CreatedAt))
                .FirstOrDefaultAsync();

            return data.Deserialize<Configuration<T>>();
        }
        public async Task CreateAsync<T>(Configuration<T> instance) 
        {
            string configName = TryGetConfigName<T>();
            instance.Name = configName;
            instance.Id = Guid.NewGuid().AsObjectIdString();
            instance.CreatedAt = DateTime.Now;
            await baseCollection.CreateAsync(instance.ToBsonDocument());
        }

        private static string TryGetConfigName<T>()
        {
            var configName = typeof(T)
                .GetCustomAttribute<ConfigNameAttribute>()?.Name;

            Require.Strings.NotNullOrWhiteSpace(configName, nameof(configName));
            return configName;
        }
    }
}
