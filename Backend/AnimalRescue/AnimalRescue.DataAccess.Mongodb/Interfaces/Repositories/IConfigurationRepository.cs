using AnimalRescue.DataAccess.Mongodb.Models.Configurations;

using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
    public interface IConfigurationRepository
    {
        Task<Configuration<T>> GetConfigurationAsync<T>();
        Task CreateAsync<T>(Configuration<T> instance);
        Task UpdateAsync<T>(Configuration<T> instance);
    }
}
