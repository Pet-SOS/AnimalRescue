using AnimalRescue.Contracts.Common.Constants;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Infrastructure.Validation;

using MongoDB.Driver;

using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class ConfigurationRepository : IConfigurationRepository
    {
        private readonly IBaseCollection<Configuration<CmsConfigurationNested>> baseCollection;

        public ConfigurationRepository(IBaseCollection<Configuration<CmsConfigurationNested>> baseCollection)
        {
            Require.Objects.NotNull(baseCollection, nameof(baseCollection));

            this.baseCollection = baseCollection;
        }

        public async Task<Configuration<CmsConfigurationNested>> GetCmsConfigurationAsync()
        {
            var configuration = await baseCollection.Collection
                .Find(x => x.Name == ConfigurationConstants.CmsConfigurationName)
                .FirstOrDefaultAsync();

            return configuration;
        }
    }
}
