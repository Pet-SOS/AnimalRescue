﻿using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Donations;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Info;

using System.Threading.Tasks;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IConfigurationService :
        IBlCreateAsync<AboutDto>,
        IBlCreateAsync<AboutFinancialReportsDto>,
        IBlCreateAsync<AboutRulesDto>,
        IBlCreateAsync<AdoptPopupDto>,
        IBlCreateAsync<CmsConfigurationDto>,
        IBlCreateAsync<DonationConfigurationDto>,
        IBlCreateAsync<HomeDto>,
        IBlCreateAsync<HowToHelpDto>,
        IBlCreateAsync<LanguagesConfigDto>,
        IBlCreateAsync<FinancialReportsInfoDto>,
        IBlUpdateAsync<AboutDto>,
        IBlUpdateAsync<AboutFinancialReportsDto>,
        IBlUpdateAsync<AboutRulesDto>,
        IBlUpdateAsync<AdoptPopupDto>,
        IBlUpdateAsync<DonationConfigurationDto>,
        IBlUpdateAsync<CmsConfigurationDto>,
        IBlUpdateAsync<FinancialReportsInfoDto>,
        IBlUpdateAsync<HomeDto>,
        IBlUpdateAsync<HowToHelpDto>,
        IBlUpdateAsync<LanguagesConfigDto>
    {
        Task<AboutDto> GetAboutConfigurationAsync();
        Task<AboutFinancialReportsDto> GetAboutFinancialReportsConfigurationAsync();
        Task<AboutRulesDto> GetAboutRulesConfigurationAsync();
        Task<AdoptPopupDto> GetAdoptPopupConfigurationAsync();
        Task<CmsConfigurationDto> GetCmsConfigurationAsync();
        Task<DonationConfigurationDto> GetDonationConfigurationAsync();
        Task<HomeDto> GetHomeConfigurationAsync();
        Task<HowToHelpDto> GetHowToHelpConfigurationAsync();
        Task<LanguagesConfigDto> GetLanguagesConfigurationAsync();
        Task<FinancialReportsInfoDto> GetFinancialReportsInfoConfigurationAsync();
    }
}
