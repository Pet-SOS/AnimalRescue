using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Models.History;
using AnimalRescue.DataAccess.Mongodb.Repositories;
using AnimalRescue.Infrastructure.Validation;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Decorators
{
    internal class TagHistoryDecorator : HistoryDecorator<Tags>, ITagRepository
    {
        public TagHistoryDecorator(ITagRepository tagRepository, IBaseRepository<History> historyRepository)
            : base(tagRepository, historyRepository)
        {
            Require.Objects.NotNull(entityRepository, nameof(entityRepository));
            Require.Objects.NotNull(historyRepository, nameof(historyRepository));
        }

        private ITagRepository TagRepository => (entityRepository as TagRepository);

        public Task<IEnumerable<Tags>> WhereAsync(IEnumerable<Tags> value) => TagRepository.WhereAsync(value);

        public async Task<IEnumerable<Tags>> CreateAsync(IEnumerable<Tags> value)
        {
            var results = await TagRepository.CreateAsync(value);

            foreach (var tag in results)
            {
                await CreateHistoryAsync(tag);
            }

            return results;
        }
    }
}
