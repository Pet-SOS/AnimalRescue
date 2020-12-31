using System.Threading.Tasks;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Migrations.Engine;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested;

namespace AnimalRescue.DataAccess.Mongodb.Migrations
{
    [Migration("202006101942_AddPredefinedDonationData")]
    internal class AddPredefinedDonationData : IAnimalRescueMigration
    {
        private readonly IConfigurationRepository _configurationRepository;

        public AddPredefinedDonationData(IConfigurationRepository configurationRepository)
        {
            _configurationRepository = configurationRepository;
        }

        public async Task Execute()
        {
            await _configurationRepository.SetUpDataBaseFromJsonFileAsync<IConfigurationRepository, Configuration<Donation>>(
                "donation.json",
                (repo, item) => repo.CreateAsync(item));
        }
    }
}
