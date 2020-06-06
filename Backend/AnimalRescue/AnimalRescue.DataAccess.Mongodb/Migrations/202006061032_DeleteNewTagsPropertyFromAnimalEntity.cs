using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Migrations.Engine;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Repositories;

using MongoDB.Bson;

using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Migrations
{
    [Migration("202006061032_DeleteNewTagsPropertyFromAnimalEntity")]
    internal class DeleteNewTagsPropertyFromAnimalEntity : IAnimalRescueMigration
    {
        private readonly AnimalRepository _animalRepository;

        public DeleteNewTagsPropertyFromAnimalEntity(IAnimalRepository animalRepository)
        {
            _animalRepository = animalRepository as AnimalRepository;
        }

        public async Task Execute()
        {
            var doc = new BsonDocument("newTags", "");
            var unsetDoc = new BsonDocument("$unset", doc);
            await _animalRepository.Collection.UpdateManyAsync(MongoDB.Driver.Builders<Animal>.Filter.Empty, unsetDoc);
        }
    }
}
