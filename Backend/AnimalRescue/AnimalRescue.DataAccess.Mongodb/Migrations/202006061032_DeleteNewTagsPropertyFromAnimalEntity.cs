using AnimalRescue.DataAccess.Mongodb.Interfaces;
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
        private readonly IBaseCollection<Animal> _animalCollection;

        public DeleteNewTagsPropertyFromAnimalEntity(IBaseCollection<Animal> animalCollection)
        {
            _animalCollection = animalCollection;
        }

        public async Task Execute()
        {
            var doc = new BsonDocument("newTags", "");
            var unsetDoc = new BsonDocument("$unset", doc);
            await _animalCollection.Collection.UpdateManyAsync(MongoDB.Driver.Builders<Animal>.Filter.Empty, unsetDoc);
        }
    }
}
