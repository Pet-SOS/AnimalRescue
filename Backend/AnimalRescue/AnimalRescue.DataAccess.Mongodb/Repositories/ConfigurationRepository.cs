using AnimalRescue.DataAccess.Mongodb.Configurations;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Models.DTO;
using MongoDB.Driver;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    public class ConfigurationRepository : Repository<Configuration>, IConfigurationRepository
    {
        public ConfigurationRepository(IMongoClient client, IMongoDbSettings settings)
            : base(client, settings)
        {
        }

        public async Task<CmsConfigurationModel> GetCmsConfigurationAsync()
        {
            var configurationCursor = await collection.FindAsync(x => x.Name == "Cms");

            var configuration = await configurationCursor.FirstOrDefaultAsync();

            var cmsConfiguration = new CmsConfigurationModel()
            {
                Id = configuration.Id,
                Phones = configuration.Phones,
                SocialLinks = configuration.SocialLinks
            };

            return cmsConfiguration;
        }
    }
}
