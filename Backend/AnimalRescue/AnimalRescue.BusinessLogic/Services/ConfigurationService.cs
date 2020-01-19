using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Donations;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested;

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

        public async Task CreateAsync(CmsConfigurationDto value) => 
            await CreateConfigurationAsync<CmsConfigurationDto, Contacts>(value);

        public async Task CreateAsync(DonationConfigurationDto value) => 
            await CreateConfigurationAsync<DonationConfigurationDto, Donation>(value);

        public async Task<CmsConfigurationDto> GetCmsConfigurationAsync() =>
            await GetDonationConfigurationAsync<CmsConfigurationDto, Contacts>();

        public async Task<DonationConfigurationDto> GetDonationConfigurationAsync() => 
            await GetDonationConfigurationAsync<DonationConfigurationDto, Donation>();
       
        private async Task CreateConfigurationAsync<TFrom, TConfiguration>(TFrom value)
        {
            var configuration = mapper.Map<TFrom, Configuration<TConfiguration>>(value);

            await _configurationRepository.CreateAsync(configuration);
        }

        private async Task<TOut> GetDonationConfigurationAsync<TOut, TConfig>()
        {
            var configurationDbo = await _configurationRepository.GetConfigurationAsync<TConfig>();
            var configurationDto = mapper.Map<Configuration<TConfig>, TOut>(configurationDbo);

            return configurationDto;
        }
    }
}
