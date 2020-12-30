using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Migrations.Engine;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested;

using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Migrations
{
    [Migration("202007232043_AddPredefinedLanguagesData")]
    internal class AddPredefinedLanguagesData : IAnimalRescueMigration
    {
        const string fileName = "languages.json";

        private readonly IConfigurationRepository<LanguagesConfig> _configurationRepository;

        public AddPredefinedLanguagesData(IConfigurationRepository<LanguagesConfig> configurationRepository)
        {
            _configurationRepository = configurationRepository;
        }

        public async Task Execute()
        {
            await _configurationRepository.SetUpDataBaseFromJsonFileAsync<IConfigurationRepository<LanguagesConfig>, Configuration<LanguagesConfig>>(
                fileName,
                (repo, item) => repo.CreateAsync(item));
        }
    }
}
