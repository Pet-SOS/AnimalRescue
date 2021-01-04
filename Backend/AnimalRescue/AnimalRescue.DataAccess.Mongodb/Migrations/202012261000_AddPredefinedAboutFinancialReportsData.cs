using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Migrations.Engine;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested.Info;

using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Migrations
{
    [Migration("202012261000_AddPredefinedAboutFinancialReportsData")]
    internal class AddPredefinedAboutFinancialReportsData : IAnimalRescueMigration
    {
        const string fileName = "about_financial_reports.json";

        private readonly IConfigurationRepository _configurationRepository;

        public AddPredefinedAboutFinancialReportsData(IConfigurationRepository configurationRepository)
        {
            _configurationRepository = configurationRepository;
        }

        public async Task Execute()
        {
            await _configurationRepository.SetUpDataBaseFromJsonFileAsync<IConfigurationRepository, Configuration<AboutFinancialReports>>(
                fileName,
                (repo, item) => repo.CreateAsync(item));
        }
    }
}
