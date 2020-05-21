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

        public override async Task UpdateAsync(Animal instance)
        {
            var newData = instance;
            var oldData = await base.GetAsync(instance.Id);
            Require.Objects.NotNull<NotFoundException>(oldData, () => $"Animal with id: {instance.Id} not found");
            
            await base.UpdateAsync(instance);
        }
    }
}
