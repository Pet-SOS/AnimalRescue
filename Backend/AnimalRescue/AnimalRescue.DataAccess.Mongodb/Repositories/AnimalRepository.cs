using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.QueryBuilders;
using AnimalRescue.Infrastructure.Validation;

using MongoDB.Driver;

using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class AnimalRepository : 
        BaseCollection<Animal>, 
        IAnimalRepository
    {
        public AnimalRepository(IMongoDatabase database, IQueryBuilder<Animal> builder) : base(database, builder)
        {
        }

        public override async Task UpdateAsync(Animal instanse)
        {
            var newData = instanse;
            var oldData = await base.GetAsync(instanse.Id);
            Require.Objects.NotNull<NotFoundException>(oldData, () => $"Animal with id: {instanse.Id} not found");
            instanse.ImageIds.AddRange(oldData.ImageIds);

            await base.UpdateAsync(instanse);
        }
    }
}
