using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Models.DTO;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
    public interface IConfigurationRepository
    {
        Task<CmsConfigurationModel> GetCmsConfigurationAsync();
    }
}
