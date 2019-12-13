using AnimalRescue.Models.DTO;

using System.Threading.Tasks;

namespace AnimalRescue.Contracts.Services
{
    public interface IConfigurationService
    {
        Task<CmsConfigurationModel> GetCmsConfigurationAsync();
    }
}
