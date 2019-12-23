using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;

using AutoMapper;

using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class ConfigurationService : IConfigurationService
    {
        private readonly IConfigurationRepository _configurationRepository;
        private readonly IMapper mapper;

        public ConfigurationService(IConfigurationRepository configurationRepository, IMapper mapper)
        {
            _configurationRepository = configurationRepository;
            this.mapper = mapper;
        }

        public async Task<CmsConfigurationDto> GetCmsConfigurationAsync()
        {
            var configurationDbo = await _configurationRepository.GetCmsConfigurationAsync();
            var configurationDto = mapper.Map<Configuration<CmsConfigurationNested>, CmsConfigurationDto>(configurationDbo);

            return configurationDto;
        }
    }
}
