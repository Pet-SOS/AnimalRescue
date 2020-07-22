using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Migrations.Engine;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested.Info;

using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Migrations
{
    [Migration("202007221901_AddPredefinedHelpAdoptData")]
    internal class AddPredefinedHelpAdoptData : IAnimalRescueMigration
    {
        const string fileName = "help_adopt.json";

        private readonly IConfigurationRepository _configurationRepository;

        public AddPredefinedHelpAdoptData(IConfigurationRepository configurationRepository)
        {
            _configurationRepository = configurationRepository;
        }

        public async Task Execute()
        {
            await _configurationRepository.SetUpDataBaseFromJsonFileAsync<IConfigurationRepository, Configuration<HelpAdopt>>(
                fileName,
                (repo, item) => repo.CreateAsync(item));
        }
    }
}