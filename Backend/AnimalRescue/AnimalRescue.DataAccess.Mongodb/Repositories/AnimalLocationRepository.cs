using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Extensions;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Query;
using AnimalRescue.Infrastructure.Validation;

using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;
using condition = AnimalRescue.DataAccess.Mongodb.Extensions.FilterDefinitionExtensions;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class AnimalLocationRepository : IAnimalLocationRepository
    {
        private readonly IBaseCollection<AnimalLocation> _baseCollection;

        public AnimalLocationRepository(IBaseCollection<AnimalLocation> baseCollection)
        {
            Require.Objects.NotNull(baseCollection, nameof(baseCollection));

            _baseCollection = baseCollection;
        }

        public async Task<List<AnimalLocation>> GetAsync(DbQuery query)
        {
            return await _baseCollection.GetAsync(query);
        }

        public async Task<AnimalLocation> GetAsync(string id)
        {
            return await _baseCollection.GetAsync(id);
        }

        public async Task<AnimalLocation> CreateAsync(AnimalLocation animalLocation)
        {
            Require.Objects.NotNull(animalLocation, nameof(animalLocation));

            animalLocation.CreatedAt = DateTime.UtcNow;
            animalLocation.Id = string.Empty;

            return await _baseCollection.CreateAsync(animalLocation);
        }

        public async Task CreateAsync(IEnumerable<AnimalLocation> animalLocation)
        {
            if (animalLocation?.Count() == 0)
            {
                return;
            }

            animalLocation =  animalLocation.Select(x=> { x.Id = null; x.CreatedAt = DateTime.UtcNow; return x; });
            await _baseCollection.CreateAsync(animalLocation);
        }

        public async Task UpdateAsync(AnimalLocation animalLocation)
        {
            Require.Objects.NotNull(animalLocation, nameof(animalLocation));

            var oldAnimalLocation = await _baseCollection.GetAsync(animalLocation.Id);

            Require.Objects.NotNull<NotFoundException>(oldAnimalLocation,
                () => $"{animalLocation.Name} with id: {animalLocation.Id} not found");

            oldAnimalLocation.Name = animalLocation.Name;
            oldAnimalLocation.Phone = animalLocation.Phone;
            oldAnimalLocation.Price = animalLocation.Price;
            oldAnimalLocation.Address = animalLocation.Address;
            oldAnimalLocation.LocationType = animalLocation.LocationType;

            await _baseCollection.UpdateAsync(oldAnimalLocation);

        }

        public async Task DeleteAsync(string id)
        {
            Require.Strings.NotNullOrWhiteSpace(id, nameof(id));

            await _baseCollection.DeleteAsync(id);
        }

        public async Task<int> GetCountAsync(DbQuery query)
        {
            return await _baseCollection.GetCountAsync(query);
        }

        public async Task<List<AnimalLocation>> WhereAsync(List<AnimalLocation> tags)
        {
            List<BsonDocument> items = new List<BsonDocument>();
            FilterDefinition<BsonDocument> filter = condition.OR( 
                tags 
                .Select(x => common.Name.EQ(x.Name))
                .ToArray());

            IAsyncCursor<BsonDocument> cursor = await _baseCollection.NativeCollection.FindAsync(filter);
            List<AnimalLocation> result = cursor.ToList().Select(x => x.Deserialize<AnimalLocation>()).ToList();

            return result;
        }
    }
}
