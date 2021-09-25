using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Migrations.Engine;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested;

using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Migrations
{
    [Migration("202007232020_OverwritePredefinedConfigurationContacts")]
    internal class OverwritePredefinedConfigurationContacts : IAnimalRescueMigration
    {
        const string fileName = "contacts_202007232020.json";

        private readonly IConfigurationRepository _configurationRepository;

        public OverwritePredefinedConfigurationContacts(IConfigurationRepository configurationRepository)
        {
            _configurationRepository = configurationRepository;
        }

        public async Task Execute()
        {
            await _configurationRepository.SetUpDataBaseFromJsonFileAsync<IConfigurationRepository, Configuration<Contacts>>(
                fileName,
                (repo, item) => repo.CreateAsync(item));
        }
    }
}
