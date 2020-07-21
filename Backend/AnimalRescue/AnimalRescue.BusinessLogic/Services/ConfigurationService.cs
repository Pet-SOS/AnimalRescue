using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Donations;
using AnimalRescue.Contracts.BusinessLogic.Models.Tag;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested;
using AnimalRescue.DataAccess.Mongodb.Models.Tag;
using AnimalRescue.DataAccess.Mongodb.Query;
using AutoMapper;

using System.Threading.Tasks;
using AnimalRescue.DataAccess.Mongodb.Extensions;
using System;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class ConfigurationService : IConfigurationService
    {
        private readonly IConfigurationRepository _configurationRepository;
        private readonly ITagLargeRepository _tagLargeRepository;
        private readonly IMapper mapper;

        public ConfigurationService(IConfigurationRepository configurationRepository, ITagLargeRepository tagLargeRepository, IMapper mapper)
        {
            _configurationRepository = configurationRepository;
            _tagLargeRepository = tagLargeRepository;
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

        public async Task CreateAsync(GetHomePopupDto value)
        {
            value.Title = await CreateTagLarge(value.Title);
            value.Text = await CreateTagLarge(value.Text);
            await CreateConfigurationAsync<GetHomePopupDto, HomePopup>(value);
        }

        public async Task<GetHomePopupDto> GetHomePopupConfigurationAsync()
        {
            var getHomePopupDto = await GetDonationConfigurationAsync<GetHomePopupDto, HomePopup>();
            getHomePopupDto.Title = await GetTagLargeDto(new Guid(getHomePopupDto.Title.Id));
            getHomePopupDto.Text = await GetTagLargeDto(new Guid(getHomePopupDto.Text.Id));
            return getHomePopupDto;
        }

        public async Task CreateAsync(LanguagesConfigDto value)
        {
            await CreateConfigurationAsync<LanguagesConfigDto, LanguagesConfig>(value);
        }

        private async Task<TagLargeDto> CreateTagLarge(TagLargeDto tagLargeDto)
        {
            var tagLargeDbo = mapper.Map<TagLargeDto, TagLarge>(tagLargeDto);
            tagLargeDbo = await _tagLargeRepository.CreateAsync(tagLargeDbo);
            var tagLargeDtoNew = mapper.Map<TagLarge, TagLargeDto>(tagLargeDbo);
            return tagLargeDtoNew;
        }

        private async Task<TagLargeDto> GetTagLargeDto(Guid guid)
        {
            var id = guid.AsObjectIdString();
            var tagLargeDbo = await _tagLargeRepository.GetAsync(id);
            var tagLargeDtoNew = mapper.Map<TagLarge, TagLargeDto>(tagLargeDbo);
            return tagLargeDtoNew;
        }
    }
}
