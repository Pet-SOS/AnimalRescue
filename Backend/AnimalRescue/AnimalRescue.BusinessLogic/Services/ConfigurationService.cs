using AnimalRescue.Contracts.Services;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Models.DTO;

using AutoMapper;

using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    public class ConfigurationService : IConfigurationService
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
