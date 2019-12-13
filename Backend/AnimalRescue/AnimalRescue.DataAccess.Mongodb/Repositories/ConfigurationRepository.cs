using AnimalRescue.DataAccess.Mongodb.Configurations;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Models.DTO;

using MongoDB.Driver;

using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    public class ConfigurationRepository : Repository<Configuration<CmsConfigurationNested>>, IConfigurationRepository
    {
        public ConfigurationRepository(IMongoClient client, IMongoDbSettings settings)
            : base(client, settings)
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

            var cmsConfiguration = new CmsConfigurationDto()
            {
                Id = configuration.Id,
                Phones = configuration.Data.Phones,
                SocialLinks = configuration.Data.SocialLinks
            };

            return cmsConfiguration;
        }
    }
}
