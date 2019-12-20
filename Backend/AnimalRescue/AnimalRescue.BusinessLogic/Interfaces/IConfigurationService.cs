using AnimalRescue.BusinessLogic.Models;

using System.Threading.Tasks;

namespace AnimalRescue.Contracts.Services
{
    public interface IConfigurationService
    {
        Task<CmsConfigurationDto> GetCmsConfigurationAsync();
    }
}
