using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Migrations.Engine;
using AnimalRescue.DataAccess.Mongodb.Migrations.MigrationModels.Configurations;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations;

using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Migrations
{
    [Migration("202006101926_AddPredefinedCmsData")]
    internal class AddPredefinedCmsData : IAnimalRescueMigration
    {
        private readonly IConfigurationRepository<Contacts202006101926> _configurationRepository;

        public AddPredefinedCmsData(IConfigurationRepository<Contacts202006101926> configurationRepository)
        {
            _configurationRepository = configurationRepository;
        }

        public async Task Execute()
        {
            await _configurationRepository.SetUpDataBaseFromJsonFileAsync<IConfigurationRepository<Contacts202006101926>, Configuration<Contacts202006101926>>(
                "cms.json",
                (repo, item) => repo.CreateAsync(item));
        }
    }
}
