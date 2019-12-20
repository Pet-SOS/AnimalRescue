using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Models.DTO;

using AutoMapper;

using MongoDB.Driver;

using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class ConfigurationRepository : IConfigurationRepository
    {
        private readonly IBaseCollection<Configuration<CmsConfigurationNested>> baseCollection;
        private readonly IMapper mapper;

        public ConfigurationRepository(IBaseCollection<Configuration<CmsConfigurationNested>> baseCollection,
            IMapper mapper)
        {
            this.baseCollection = baseCollection;
            this.mapper = mapper;
        }

        public async Task<CmsConfigurationDto> GetCmsConfigurationAsync()
        {
            var configuration = await baseCollection.Collection
                .Find(x => x.Name == Constants.CmsConfigurationName)
                .FirstOrDefaultAsync();

            if (configuration == null)
            {
                return null;
            }
            
            var cmsConfiguration = mapper.Map<Configuration<CmsConfigurationNested>, CmsConfigurationDto>(configuration);

            return cmsConfiguration;
        }
    }
}
