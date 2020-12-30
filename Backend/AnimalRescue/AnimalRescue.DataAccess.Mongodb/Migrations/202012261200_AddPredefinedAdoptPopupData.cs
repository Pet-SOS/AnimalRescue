using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Migrations.Engine;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested.Info;

using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Migrations
{
    [Migration("202012261200_AddPredefinedAdoptPopupData")]
    internal class AddPredefinedAdoptPopupData : IAnimalRescueMigration
    {
        const string fileName = "adopt_popup.json";

        private readonly IConfigurationRepository<AdoptPopup> _configurationRepository;

        public AddPredefinedAdoptPopupData(IConfigurationRepository<AdoptPopup> configurationRepository)
        {
            _configurationRepository = configurationRepository;
        }

        public async Task Execute()
        {
            await _configurationRepository.SetUpDataBaseFromJsonFileAsync<IConfigurationRepository<AdoptPopup>, Configuration<AdoptPopup>>(
                fileName,
                (repo, item) => repo.CreateAsync(item));
        }
    }
}
