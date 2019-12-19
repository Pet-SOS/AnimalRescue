using AnimalRescue.DataAccess.Mongodb.Configurations;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.QueryBuilders;
using AnimalRescue.Models.DTO;
using AutoMapper;
using MongoDB.Driver;

using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class ConfigurationRepository : BaseCollection<Configuration<CmsConfigurationNested>>, IConfigurationRepository
    {
        public ConfigurationRepository(
            IMongoDatabase database,
            IQueryBuilder<Configuration<CmsConfigurationNested>> queryBuilder,
            IMapper mapper)
            : base(database, queryBuilder, mapper)
        {
        }

        public async Task<CmsConfigurationDto> GetCmsConfigurationAsync()
        {
            var configurationCursor = await collection.FindAsync(x => x.Name == Constants.CmsConfigurationName);

            var configuration = await configurationCursor.FirstOrDefaultAsync();
            if (configuration == null)
            {
                return null;
            }
            
            var cmsConfiguration = ConvertOneTo<CmsConfigurationDto>(configuration);

            return cmsConfiguration;
        }
    }
}
