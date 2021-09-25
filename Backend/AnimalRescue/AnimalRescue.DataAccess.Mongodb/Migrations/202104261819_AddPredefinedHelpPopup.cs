using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Migrations.Engine;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested.Info;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Migrations
{
    [Migration("202104261819_AddPredefinedHelpPopup")]
    internal class AddPredefinedHelpPopup : IAnimalRescueMigration
    {
        const string fileName = "help_popup.json";

        private readonly IConfigurationRepository _configurationRepository;

        public AddPredefinedHelpPopup(IConfigurationRepository configurationRepository)
        {
            _configurationRepository = configurationRepository;
        }

        public async Task Execute()
        {
            await _configurationRepository.SetUpDataBaseFromJsonFileAsync<IConfigurationRepository, Configuration<HelpPopup>>(
                fileName,
                (repo, item) => repo.CreateAsync(item));
        }
    }
}
