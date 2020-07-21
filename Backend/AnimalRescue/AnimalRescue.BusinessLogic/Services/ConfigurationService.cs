using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Donations;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Info;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested.Info;

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

        public async Task CreateAsync(HomePopupDto value) => 
            await CreateConfigurationAsync<HomePopupDto, HomePopup>(value);

        public async Task CreateAsync(HelpPopupDto value) => 
            await CreateConfigurationAsync<HelpPopupDto, HelpPopup>(value);

        public async Task CreateAsync(HelpAdoptDto value) => 
            await CreateConfigurationAsync<HelpAdoptDto, HelpAdopt>(value);

        public async Task<CmsConfigurationDto> GetCmsConfigurationAsync() =>
            await GetConfigurationAsync<CmsConfigurationDto, Contacts>();

        public async Task<DonationConfigurationDto> GetDonationConfigurationAsync() => 
            await GetConfigurationAsync<DonationConfigurationDto, Donation>();
       
        public async Task<HomePopupDto> GetHomePopupConfigurationAsync() => 
            await GetConfigurationAsync<HomePopupDto, HomePopup>();

        public async Task<HelpPopupDto> GetHelpPopupConfigurationAsync() => 
            await GetConfigurationAsync<HelpPopupDto, HelpPopup>();

        public async Task<HelpAdoptDto> GetHelpAdoptConfigurationAsync() => 
            await GetConfigurationAsync<HelpAdoptDto, HelpAdopt>();

        private async Task CreateConfigurationAsync<TFrom, TConfiguration>(TFrom value)
        {
            var configuration = mapper.Map<TFrom, Configuration<TConfiguration>>(value);

            await _configurationRepository.CreateAsync(configuration);
        }

        private async Task<TOut> GetConfigurationAsync<TOut, TConfig>()
        {
            var configurationDbo = await _configurationRepository.GetConfigurationAsync<TConfig>();
            var configurationDto = mapper.Map<Configuration<TConfig>, TOut>(configurationDbo);

            return configurationDto;
        }

        public async Task CreateAsync(LanguagesConfigDto value)
        {
            await CreateConfigurationAsync<LanguagesConfigDto, LanguagesConfig>(value);
        }
    }
}
