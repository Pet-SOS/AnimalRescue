using AnimalRescue.Models.DTO;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts
{
    public interface IConfigurationService
    {
        Task<CmsConfigurationModel> GetCmsConfiguration();
    }
}
