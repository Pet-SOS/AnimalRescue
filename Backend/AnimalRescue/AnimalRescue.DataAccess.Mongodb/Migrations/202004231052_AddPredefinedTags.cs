using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Migrations.Engine;
using AnimalRescue.DataAccess.Mongodb.Models.Tag;

using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Migrations
{
    [Migration("202004231052_AddPredefinedTags")]
    internal class AddPredefinedTags : IAnimalRescueMigration
    {
        private readonly IWellKnownTagRepository _wellKnownTagRepository;

        public AddPredefinedTags(IWellKnownTagRepository wellKnownTagRepository)
        {
            _wellKnownTagRepository = wellKnownTagRepository;
        }

        public async Task Execute()
        {
            await _wellKnownTagRepository.SetUpDataBaseFromJsonFileAsync<IWellKnownTagRepository, WellKnownTag>(
                "tags.json",
                (repo, collection) => repo.WhereByIdAsync(collection),
                (repo, collection) => repo.CreateAsync(collection),
                (x, y) => x.Id == y.Id);
        }
    }
}