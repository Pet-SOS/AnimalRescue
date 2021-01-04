using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Migrations.Engine;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested.Info;

using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Migrations
{
    [Migration("202012211600_AddPredefinedAboutRulesData")]
    internal class AddPredefinedAboutRulesData : IAnimalRescueMigration
    {
        const string fileName = "about_rules.json";

        private readonly IConfigurationRepository _configurationRepository;

        public AddPredefinedAboutRulesData(IConfigurationRepository configurationRepository)
        {
            _configurationRepository = configurationRepository;
        }

        public async Task Execute()
        {
            await _configurationRepository.SetUpDataBaseFromJsonFileAsync<IConfigurationRepository, Configuration<AboutRules>>(
                fileName,
                (repo, item) => repo.CreateAsync(item));
        }
    }
}
