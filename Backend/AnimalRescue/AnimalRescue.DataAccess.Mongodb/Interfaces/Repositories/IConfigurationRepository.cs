using AnimalRescue.DataAccess.Mongodb.Models;

using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
    public interface IConfigurationRepository
    {
        Task<Configuration<CmsConfigurationNested>> GetCmsConfigurationAsync();
    }
}
