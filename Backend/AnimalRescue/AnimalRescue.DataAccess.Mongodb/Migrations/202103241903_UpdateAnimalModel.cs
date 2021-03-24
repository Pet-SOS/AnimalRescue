using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Migrations.Engine;
using AnimalRescue.DataAccess.Mongodb.Migrations.MigrationModels.Animal;
using AnimalRescue.DataAccess.Mongodb.Models;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Migrations
{
    [Migration("202003060152_AddDefaultUserAndAdminRoles")]
    internal class UpdateAnimalModel : IAnimalRescueMigration
    {
        private readonly IBaseRepository<Animal202103241821> _animalV1Repository;
        private readonly IBaseRepository<Animal> _animalV2Repository;

        public UpdateAnimalModel(IBaseRepository<Animal202103241821> animalV1Repository, IBaseRepository<Animal> animalV2Repository)
        {
            this._animalV1Repository = animalV1Repository;
            this._animalV2Repository = animalV2Repository;
        }

        public async Task Execute()
        {
            await foreach (var animalV1 in _animalV1Repository.GetAllItemsAsync())
            {
                var animal = Map(animalV1);

                await _animalV2Repository.UpdateAsync(animal);
            }
        }

        private Animal Map(Animal202103241821 animalV1)
        {
            return new Animal();
        }
    }
}
