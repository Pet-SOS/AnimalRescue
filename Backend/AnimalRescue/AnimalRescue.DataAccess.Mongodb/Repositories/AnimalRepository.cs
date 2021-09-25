using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Infrastructure.Validation;

using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class AnimalRepository :
        BaseRepository<Animal>
    {
        public AnimalRepository(IBaseCollection<Animal> baseCollection) : base(baseCollection)
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
