using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Migrations.Engine;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested.Info;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Migrations
{
    [Migration("202104261828_AddPredefinedHowToAdoptData")]
    internal class AddPredefinedHowToAdoptData : IAnimalRescueMigration
    {
        const string fileName = "how_to_adopt.json";

        private readonly IConfigurationRepository _configurationRepository;

        public AddPredefinedHowToAdoptData(IConfigurationRepository configurationRepository)
        {
            _configurationRepository = configurationRepository;
        }

        public async Task Execute()
        {
            await _configurationRepository.SetUpDataBaseFromJsonFileAsync<IConfigurationRepository, Configuration<HowToAdopt>>(
                fileName,
                (repo, item) => repo.CreateAsync(item));
        }
    }
}
