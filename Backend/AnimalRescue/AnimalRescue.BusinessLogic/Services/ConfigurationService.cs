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
        private readonly IConfigurationRepository<About> _configAboutRepository;
        private readonly IConfigurationRepository<AboutFinancialReports> _configAboutFinancialReportsRepository;
        private readonly IConfigurationRepository<AboutRules> _configAboutRulesRepository;
        private readonly IConfigurationRepository<AdoptPopup> _configAdoptPopupRepository;
        private readonly IConfigurationRepository<Contacts> _configContactsRepository;
        private readonly IConfigurationRepository<Donation> _configDonationRepository;
        private readonly IConfigurationRepository<Home> _configHomeRepository;
        private readonly IConfigurationRepository<HowToHelp> _configHowToHelpRepository;
        private readonly IConfigurationRepository<LanguagesConfig> _configLanguagesConfigRepository;
        private readonly IConfigurationRepository<FinancialReportsInfo> _configFinancialReportsInfoRepository;

        public ConfigurationService(IMapper mapper,
            IConfigurationRepository<About> configAboutRepository,
            IConfigurationRepository<AboutFinancialReports> configAboutFinancialReportsRepository,
            IConfigurationRepository<AboutRules> configAboutRulesRepository,
            IConfigurationRepository<AdoptPopup> configAdoptPopupRepository,
            IConfigurationRepository<Contacts> configContactsRepository,
            IConfigurationRepository<Donation> configDonationRepository,
            IConfigurationRepository<Home> configHomeRepository,
            IConfigurationRepository<HowToHelp> configHowToHelpRepository,
            IConfigurationRepository<LanguagesConfig> configLanguagesConfigRepository,
            IConfigurationRepository<FinancialReportsInfo> configFinancialReportsInfoRepository)
        {
            _mapper = mapper;
            _configAboutRepository = configAboutRepository;
            _configAboutFinancialReportsRepository = configAboutFinancialReportsRepository;
            _configAboutRulesRepository = configAboutRulesRepository;
            _configAdoptPopupRepository = configAdoptPopupRepository;
            _configContactsRepository = configContactsRepository;
            _configDonationRepository = configDonationRepository;
            _configHomeRepository = configHomeRepository;
            _configHowToHelpRepository = configHowToHelpRepository;
            _configLanguagesConfigRepository = configLanguagesConfigRepository;
            _configFinancialReportsInfoRepository = configFinancialReportsInfoRepository;
        }

        public async Task CreateAsync(AboutDto value)
        {
            var configuration = _mapper.Map<AboutDto, Configuration<About>>(value);

            await _configAboutRepository.CreateAsync(configuration);
        }

        public async Task CreateAsync(AboutFinancialReportsDto value)
        {
            var configuration = _mapper.Map<AboutFinancialReportsDto, Configuration<AboutFinancialReports>>(value);

            await _configAboutFinancialReportsRepository.CreateAsync(configuration);
        }

        public async Task CreateAsync(AboutRulesDto value)
        {
            var configuration = _mapper.Map<AboutRulesDto, Configuration<AboutRules>>(value);

            await _configAboutRulesRepository.CreateAsync(configuration);
        }

        public async Task CreateAsync(AdoptPopupDto value)
        {
            var configuration = _mapper.Map<AdoptPopupDto, Configuration<AdoptPopup>>(value);

            await _configAdoptPopupRepository.CreateAsync(configuration);
        }

        public async Task CreateAsync(CmsConfigurationDto value)
        {
            var configuration = _mapper.Map<CmsConfigurationDto, Configuration<Contacts>>(value);

            await _configContactsRepository.CreateAsync(configuration);
        }

        public async Task CreateAsync(DonationConfigurationDto value)
        {
            var configuration = _mapper.Map<DonationConfigurationDto, Configuration<Donation>>(value);

            await _configDonationRepository.CreateAsync(configuration);
        }

        public async Task CreateAsync(HomeDto value)
        {
            var configuration = _mapper.Map<HomeDto, Configuration<Home>>(value);

            await _configHomeRepository.CreateAsync(configuration);
        }

        public async Task CreateAsync(HowToHelpDto value)
        {
            var configuration = _mapper.Map<HowToHelpDto, Configuration<HowToHelp>>(value);

            await _configHowToHelpRepository.CreateAsync(configuration);
        }

        public async Task CreateAsync(LanguagesConfigDto value)
        {
            var configuration = _mapper.Map<LanguagesConfigDto, Configuration<LanguagesConfig>>(value);

            await _configLanguagesConfigRepository.CreateAsync(configuration);
        }

        public async Task CreateAsync(FinancialReportsInfoDto value)
        {
            var configuration = _mapper.Map<FinancialReportsInfoDto, Configuration<FinancialReportsInfo>>(value);

            await _configFinancialReportsInfoRepository.CreateAsync(configuration);
        }


        public async Task<AboutDto> GetAboutConfigurationAsync()
        {
            var configurationDbo = await _configAboutRepository.GetConfigurationAsync();
            var configurationDto = _mapper.Map<Configuration<About>, AboutDto>(configurationDbo);

            return configurationDto;
        }

        public async Task<AboutFinancialReportsDto> GetAboutFinancialReportsConfigurationAsync()
        {
            var configurationDbo = await _configAboutFinancialReportsRepository.GetConfigurationAsync();
            var configurationDto = _mapper.Map<Configuration<AboutFinancialReports>, AboutFinancialReportsDto>(configurationDbo);

            return configurationDto;
        }

        public async Task<AboutRulesDto> GetAboutRulesConfigurationAsync()
        {
            var configurationDbo = await _configAboutRulesRepository.GetConfigurationAsync();
            var configurationDto = _mapper.Map<Configuration<AboutRules>, AboutRulesDto>(configurationDbo);

            return configurationDto;
        }

        public async Task<AdoptPopupDto> GetAdoptPopupConfigurationAsync()
        {
            var configurationDbo = await _configAdoptPopupRepository.GetConfigurationAsync();
            var configurationDto = _mapper.Map<Configuration<AdoptPopup>, AdoptPopupDto>(configurationDbo);

            return configurationDto;
        }

        public async Task<CmsConfigurationDto> GetCmsConfigurationAsync()
        {
            var configurationDbo = await _configContactsRepository.GetConfigurationAsync();
            var configurationDto = _mapper.Map<Configuration<Contacts>, CmsConfigurationDto>(configurationDbo);

            return configurationDto;
        }

        public async Task<DonationConfigurationDto> GetDonationConfigurationAsync()
        {
            var configurationDbo = await _configDonationRepository.GetConfigurationAsync();
            var configurationDto = _mapper.Map<Configuration<Donation>, DonationConfigurationDto>(configurationDbo);

            return configurationDto;
        }

        public async Task<HomeDto> GetHomeConfigurationAsync()
        {
            var configurationDbo = await _configHomeRepository.GetConfigurationAsync();
            var configurationDto = _mapper.Map<Configuration<Home>, HomeDto>(configurationDbo);

            return configurationDto;
        }

        public async Task<HowToHelpDto> GetHowToHelpConfigurationAsync()
        {
            var configurationDbo = await _configHowToHelpRepository.GetConfigurationAsync();
            var configurationDto = _mapper.Map<Configuration<HowToHelp>, HowToHelpDto>(configurationDbo);

            return configurationDto;
        }

        public async Task<LanguagesConfigDto> GetLanguagesConfigurationAsync()
        {
            var configurationDbo = await _configLanguagesConfigRepository.GetConfigurationAsync();
            var configurationDto = _mapper.Map<Configuration<LanguagesConfig>, LanguagesConfigDto>(configurationDbo);

            return configurationDto;
        }

        public async Task<FinancialReportsInfoDto> GetFinancialReportsInfoConfigurationAsync()
        {
            var configurationDbo = await _configFinancialReportsInfoRepository.GetConfigurationAsync();
            var configurationDto = _mapper.Map<Configuration<FinancialReportsInfo>, FinancialReportsInfoDto>(configurationDbo);

            return configurationDto;
        }


        public async Task UpdateAsync(AboutDto value)
        {
            var configuration = _mapper.Map<AboutDto, Configuration<About>>(value);

            await _configAboutRepository.UpdateAsync(configuration);
        }

        public async Task UpdateAsync(AboutFinancialReportsDto value)
        {
            var configuration = _mapper.Map<AboutFinancialReportsDto, Configuration<AboutFinancialReports>>(value);

            await _configAboutFinancialReportsRepository.UpdateAsync(configuration);
        }

        public async Task UpdateAsync(AboutRulesDto value)
        {
            var configuration = _mapper.Map<AboutRulesDto, Configuration<AboutRules>>(value);

            await _configAboutRulesRepository.UpdateAsync(configuration);
        }

        public async Task UpdateAsync(AdoptPopupDto value)
        {
            var configuration = _mapper.Map<AdoptPopupDto, Configuration<AdoptPopup>>(value);

            await _configAdoptPopupRepository.UpdateAsync(configuration);
        }

        public async Task UpdateAsync(DonationConfigurationDto value)
        {
            var configuration = _mapper.Map<DonationConfigurationDto, Configuration<Donation>>(value);

            await _configDonationRepository.UpdateAsync(configuration);
        }

        public async Task UpdateAsync(CmsConfigurationDto value)
        {
            var configuration = _mapper.Map<CmsConfigurationDto, Configuration<Contacts>>(value);

            await _configContactsRepository.UpdateAsync(configuration);
        }

        public async Task UpdateAsync(FinancialReportsInfoDto value)
        {
            var configuration = _mapper.Map<FinancialReportsInfoDto, Configuration<FinancialReportsInfo>>(value);

            await _configFinancialReportsInfoRepository.UpdateAsync(configuration);
        }

        public async Task UpdateAsync(HomeDto value)
        {
            var configuration = _mapper.Map<HomeDto, Configuration<Home>>(value);

            await _configHomeRepository.UpdateAsync(configuration);
        }

        public async Task UpdateAsync(HowToHelpDto value)
        {
            var configuration = _mapper.Map<HowToHelpDto, Configuration<HowToHelp>>(value);

            await _configHowToHelpRepository.UpdateAsync(configuration);
        }

        public async Task UpdateAsync(LanguagesConfigDto value)
        {
            var configuration = _mapper.Map<LanguagesConfigDto, Configuration<LanguagesConfig>>(value);

            await _configLanguagesConfigRepository.UpdateAsync(configuration);
        }
    }
}
