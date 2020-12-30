using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.DataAccess.Mongodb.Extensions;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations;
using AnimalRescue.Infrastructure.Validation;

using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;

using System;
using System.Reflection;
using System.Threading.Tasks;

using baseItem = AnimalRescue.Contracts.Common.Constants.PropertyConstants.BaseItem;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class ConfigurationRepository<T> : IConfigurationRepository<T>
    {
        private readonly IBaseCollection<Configuration<T>> baseCollection;

        public ConfigurationRepository(IBaseCollection<Configuration<T>> baseCollection)
        {
            Require.Objects.NotNull(baseCollection, nameof(baseCollection));

            this.baseCollection = baseCollection;
        }

        public async Task<Configuration<T>> GetConfigurationAsync()
        {
            var configName = TryGetConfigName<T>();

            var filter = common.Name.EQ(configName);

            var data = await baseCollection.NativeCollection
                .Find(filter)
                .Sort(Builders<BsonDocument>.Sort.Descending(baseItem.CreatedAt))
                .FirstOrDefaultAsync();

            return data.Deserialize<Configuration<T>>();
        }

        public async Task CreateAsync(Configuration<T> instance)
        {
            string configName = TryGetConfigName<T>();
            instance.Name = configName;
            instance.Id = Guid.NewGuid().AsObjectIdString();
            instance.CreatedAt = DateTime.Now;
            await baseCollection.CreateAsync(instance.ToBsonDocument());
        }

        public async Task UpdateAsync(Configuration<T> configuration)
        {
            Require.Objects.NotNull(configuration, nameof(configuration));

            var oldConfiguration = await GetConfigurationAsync();

            Require.Objects.NotNull<NotFoundException>(oldConfiguration,
                () => $"Configuration for {oldConfiguration.Name} not found");

            oldConfiguration.Data = configuration.Data;

            await baseCollection.UpdateAsync(oldConfiguration);
        }

        private static string TryGetConfigName<TConfig>()
        {
            var configName = typeof(TConfig)
                .GetCustomAttribute<ConfigNameAttribute>()?.Name;

            Require.Strings.NotNullOrWhiteSpace(configName, nameof(configName));
            return configName;
        }
    }
}
