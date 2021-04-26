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
        private readonly IMapper _mapper;
        private readonly IConfigurationRepository _configurationRepository;

        public ConfigurationService(IMapper mapper,
            IConfigurationRepository configurationRepository)
        {
            _mapper = mapper;
            _configurationRepository = configurationRepository;
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

        public async Task CreateAsync(HowToHelpDto value) =>
            await CreateConfigurationAsync<HowToHelpDto, HowToHelp>(value);

        public async Task CreateAsync(LanguagesConfigDto value) =>
            await CreateConfigurationAsync<LanguagesConfigDto, LanguagesConfig>(value);

        public async Task CreateAsync(HelpPopupDto value) =>
    await CreateConfigurationAsync<HelpPopupDto, HelpPopup>(value);


        public async Task UpdateAsync(AboutDto value) =>
            await UpdateConfigurationAsync<AboutDto, About>(value);

        public async Task UpdateAsync(AboutFinancialReportsDto value) =>
            await UpdateConfigurationAsync<AboutFinancialReportsDto, AboutFinancialReports>(value);

        public async Task UpdateAsync(AboutRulesDto value) =>
            await UpdateConfigurationAsync<AboutRulesDto, AboutRules>(value);

        public async Task UpdateAsync(AdoptPopupDto value) =>
            await UpdateConfigurationAsync<AdoptPopupDto, AdoptPopup>(value);

        public async Task UpdateAsync(DonationConfigurationDto value) =>
            await UpdateConfigurationAsync<DonationConfigurationDto, Donation>(value);

        public async Task UpdateAsync(CmsConfigurationDto value) =>
            await UpdateConfigurationAsync<CmsConfigurationDto, Contacts>(value);

        public async Task UpdateAsync(HomeDto value) =>
            await UpdateConfigurationAsync<HomeDto, Home>(value);

        public async Task UpdateAsync(HowToHelpDto value) =>
            await UpdateConfigurationAsync<HowToHelpDto, HowToHelp>(value);

        public async Task UpdateAsync(LanguagesConfigDto value) =>
            await UpdateConfigurationAsync<LanguagesConfigDto, LanguagesConfig>(value);

        public async Task UpdateAsync(HelpPopupDto value) =>
            await UpdateConfigurationAsync<HelpPopupDto, HelpPopup>(value);


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

        public async Task<HowToHelpDto> GetHowToHelpConfigurationAsync() =>
            await GetConfigurationAsync<HowToHelpDto, HowToHelp>();

        public async Task<LanguagesConfigDto> GetLanguagesConfigurationAsync() =>
            await GetConfigurationAsync<LanguagesConfigDto, LanguagesConfig>();

        public async Task<HelpPopupDto> GetHelpPopupConfigurationAsync() =>
            await GetConfigurationAsync<HelpPopupDto, HelpPopup>();


        private async Task CreateConfigurationAsync<TFrom, TConfiguration>(TFrom value)
        {
            var configuration = _mapper.Map<TFrom, Configuration<TConfiguration>>(value);

            await _configurationRepository.CreateAsync(configuration);
        }

        private async Task UpdateConfigurationAsync<TFrom, TConfiguration>(TFrom value)
        {
            var configuration = _mapper.Map<TFrom, Configuration<TConfiguration>>(value);

            await _configurationRepository.UpdateAsync(configuration);
        }

        private async Task<TOut> GetConfigurationAsync<TOut, TConfiguration>()
        {
            var configurationDbo = await _configurationRepository.GetConfigurationAsync<TConfiguration>();
            var configurationDto = _mapper.Map<Configuration<TConfiguration>, TOut>(configurationDbo);

            return configurationDto;
        }
    }
}
