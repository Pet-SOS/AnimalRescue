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

        public async Task CreateAsync(AboutDto value) =>
            await CreateConfigurationAsync<AboutDto, About>(value);

        public async Task CreateAsync(AboutFinancialReportsDto value) =>
            await CreateConfigurationAsync<AboutFinancialReportsDto, AboutFinancialReports>(value);

        public async Task CreateAsync(AboutRulesDto value) =>
            await CreateConfigurationAsync<AboutRulesDto, AboutRules>(value);

        public async Task CreateAsync(AdoptPopupDto value) =>
            await CreateConfigurationAsync<AdoptPopupDto, AdoptPopup>(value);

        public async Task CreateAsync(CmsConfigurationDto value) =>
            await CreateConfigurationAsync<CmsConfigurationDto, Contacts>(value);

        public async Task CreateAsync(DonationConfigurationDto value) =>
            await CreateConfigurationAsync<DonationConfigurationDto, Donation>(value);

        public async Task CreateAsync(HomeDto value) =>
            await CreateConfigurationAsync<HomeDto, Home>(value);

        public async Task CreateAsync(HomePopupDto value) =>
            await CreateConfigurationAsync<HomePopupDto, HomePopup>(value);

        public async Task CreateAsync(AdoptTopicDto value) =>
            await CreateConfigurationAsync<AdoptTopicDto, AdoptTopic>(value);

        public async Task CreateAsync(HowToHelpDto value) =>
            await CreateConfigurationAsync<HowToHelpDto, HowToHelp>(value);

        public async Task CreateAsync(LanguagesConfigDto value) =>
            await CreateConfigurationAsync<LanguagesConfigDto, LanguagesConfig>(value);

        public async Task CreateAsync(FinancialReportsInfoDto value) =>
            await CreateConfigurationAsync<FinancialReportsInfoDto, FinancialReportsInfo>(value);

        public async Task<AboutDto> GetAboutConfigurationAsync() =>
            await GetConfigurationAsync<AboutDto, About>();

        public async Task<AboutFinancialReportsDto> GetAboutFinancialReportsConfigurationAsync() =>
            await GetConfigurationAsync<AboutFinancialReportsDto, AboutFinancialReports>();

        public async Task<AboutRulesDto> GetAboutRulesConfigurationAsync() =>
            await GetConfigurationAsync<AboutRulesDto, AboutRules>();

        public async Task<AdoptPopupDto> GetAdoptPopupConfigurationAsync() =>
            await GetConfigurationAsync<AdoptPopupDto, AdoptPopup>();

        public async Task<CmsConfigurationDto> GetCmsConfigurationAsync() =>
            await GetConfigurationAsync<CmsConfigurationDto, Contacts>();

        public async Task<DonationConfigurationDto> GetDonationConfigurationAsync() =>
            await GetConfigurationAsync<DonationConfigurationDto, Donation>();

        public async Task<HomeDto> GetHomeConfigurationAsync() =>
            await GetConfigurationAsync<HomeDto, Home>();

        public async Task<HomePopupDto> GetHomePopupConfigurationAsync() =>
            await GetConfigurationAsync<HomePopupDto, HomePopup>();

        public async Task<AdoptTopicDto> GetAdoptTopicConfigurationAsync() =>
            await GetConfigurationAsync<AdoptTopicDto, AdoptTopic>();

        public async Task<HowToHelpDto> GetHowToHelpConfigurationAsync() =>
            await GetConfigurationAsync<HowToHelpDto, HowToHelp>();

        public async Task<LanguagesConfigDto> GetLanguagesConfigurationAsync() =>
            await GetConfigurationAsync<LanguagesConfigDto, LanguagesConfig>();
        public async Task<FinancialReportsInfoDto> GetFinancialReportsInfoConfigurationAsync() =>
            await GetConfigurationAsync<FinancialReportsInfoDto, FinancialReportsInfo>();

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
    }
}
