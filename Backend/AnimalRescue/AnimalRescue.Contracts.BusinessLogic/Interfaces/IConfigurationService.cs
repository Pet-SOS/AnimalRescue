using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Donations;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Info;

using System.Threading.Tasks;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IConfigurationService: 
        IBlCreateAsync<CmsConfigurationDto>, 
        IBlCreateAsync<DonationConfigurationDto>,
        IBlCreateAsync<HomePopupDto>,
        IBlCreateAsync<HelpPopupDto>,
        IBlCreateAsync<HelpAdoptDto>,
        IBlCreateAsync<LanguagesConfigDto>
    {
        Task<CmsConfigurationDto> GetCmsConfigurationAsync();
        Task<DonationConfigurationDto> GetDonationConfigurationAsync();
        Task<HomePopupDto> GetHomePopupConfigurationAsync();
        Task<HelpPopupDto> GetHelpPopupConfigurationAsync();
        Task<HelpAdoptDto> GetHelpAdoptConfigurationAsync();
    }
}
