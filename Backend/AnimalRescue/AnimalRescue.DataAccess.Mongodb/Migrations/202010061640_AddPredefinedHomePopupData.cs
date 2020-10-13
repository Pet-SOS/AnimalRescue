using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Migrations.Engine;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested.Info;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Migrations
{
    [Migration("202010061640_AddPredefinedHomePopupData")]
    internal class AddPredefinedHomePopupData : IAnimalRescueMigration
    {
        const string fileName = "home_popup.json";

        private readonly IConfigurationRepository _configurationRepository;

        public AddPredefinedHomePopupData(IConfigurationRepository configurationRepository)
        {
            _configurationRepository = configurationRepository;
        }
        public async Task Execute()
        {
            await _configurationRepository.SetUpDataBaseFromJsonFileAsync<IConfigurationRepository, Configuration<HomePopup>>(
                fileName,
                (repo, item) => repo.CreateAsync(item));
        }
    }
}
