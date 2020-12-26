using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Migrations.Engine;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested.Info;

using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Migrations
{
    [Migration("202012261100_AddPredefinedHomeData")]
    internal class AddPredefinedHomeData : IAnimalRescueMigration
    {
        const string fileName = "home.json";

        private readonly IConfigurationRepository _configurationRepository;

        public AddPredefinedHomeData(IConfigurationRepository configurationRepository)
        {
            _configurationRepository = configurationRepository;
        }

        public async Task Execute()
        {
            await _configurationRepository.SetUpDataBaseFromJsonFileAsync<IConfigurationRepository, Configuration<Home>>(
                fileName,
                (repo, item) => repo.CreateAsync(item));
        }
    }
}
