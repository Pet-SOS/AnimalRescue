using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Migrations.Engine;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested.Info;

using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Migrations
{
    [Migration("202012171215_AddPredefinedHowToHelpData")]
    internal class AddPredefinedHowToHelpData : IAnimalRescueMigration
    {
        const string fileName = "how_to_help.json";

        private readonly IConfigurationRepository<HowToHelp> _configurationRepository;

        public AddPredefinedHowToHelpData(IConfigurationRepository<HowToHelp> configurationRepository)
        {
            _configurationRepository = configurationRepository;
        }

        public async Task Execute()
        {
            await _configurationRepository.SetUpDataBaseFromJsonFileAsync<IConfigurationRepository<HowToHelp>, Configuration<HowToHelp>>(
                fileName,
                (repo, item) => repo.CreateAsync(item));
        }
    }
}
