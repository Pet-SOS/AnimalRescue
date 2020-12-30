using AnimalRescue.DataAccess.Mongodb.Models.Configurations;

using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
    public interface IConfigurationRepository<T>
    {
        Task<Configuration<T>> GetConfigurationAsync();
        Task CreateAsync(Configuration<T> instance);
        Task UpdateAsync(Configuration<T> instance);
    }
}
