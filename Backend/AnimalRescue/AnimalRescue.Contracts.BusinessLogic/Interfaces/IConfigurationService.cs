﻿using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Donations;

using System.Threading.Tasks;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IConfigurationService: 
        IBlCreateAsync<CmsConfigurationDto>, 
        IBlCreateAsync<DonationConfigurationDto>,
        IBlCreateAsync<GetHomePopupDto>,
        IBlCreateAsync<LanguagesConfigDto>
    {
        Task<CmsConfigurationDto> GetCmsConfigurationAsync();
        Task<DonationConfigurationDto> GetDonationConfigurationAsync();
        Task<GetHomePopupDto> GetHomePopupConfigurationAsync();
    }
}
