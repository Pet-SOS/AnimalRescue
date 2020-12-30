using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Migrations.Engine;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Migrations
{
    [Migration("202012071449_AddEmergencyRequestMessage")]
    internal class AddEmergencyRequestMessage : IAnimalRescueMigration
    {
        const string fileName = "emergency_request_message.json";

        private readonly IConfigurationRepository<EmergencyRequestMessage> _configurationRepository;

        public AddEmergencyRequestMessage(IConfigurationRepository<EmergencyRequestMessage> configurationRepository)
        {
            _configurationRepository = configurationRepository;
        }

        public async Task Execute()
        {
            await _configurationRepository.SetUpDataBaseFromJsonFileAsync<IConfigurationRepository<EmergencyRequestMessage>, Configuration<EmergencyRequestMessage>>(
                fileName,
                (repo, item) => repo.CreateAsync(item));
        }
    }
}
