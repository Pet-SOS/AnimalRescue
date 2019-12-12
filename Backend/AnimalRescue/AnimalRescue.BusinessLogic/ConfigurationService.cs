using AnimalRescue.Contracts;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.Models.DTO;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic
{
    public class ConfigurationService : IConfigurationService
    {
        private readonly IConfigurationRepository _configurationRepository;

        public ConfigurationService(IConfigurationRepository configurationRepository)
        {
            _configurationRepository = configurationRepository;
        }

        public async Task<CmsConfigurationModel> GetCmsConfiguration()
        {
            return await _configurationRepository.GetCmsConfigurationAsync();
        }
    }
}
