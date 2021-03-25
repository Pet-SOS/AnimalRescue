using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Migrations.Engine;
using AnimalRescue.DataAccess.Mongodb.Migrations.MigrationModels.Animal;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using AnimalRescue.DataAccess.Mongodb.Models.Tag;
using AnimalRescue.Infrastructure.Validation;
using AutoMapper;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Reflection;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Migrations
{
    [Migration("202103241903_UpdateAnimalModel")]
    internal class UpdateAnimalModel : IAnimalRescueMigration
    {
        private readonly IBaseRepository<Animal202103241821> _animalV1Repository;
        private readonly IMongoCollection<Animal> _animalV2Collection;
        private IMapper _mapper;


        public UpdateAnimalModel(IBaseRepository<Animal202103241821> animalV1Repository, IMongoDatabase database)
        {
            Require.Objects.NotNull(database, nameof(database));
            Require.Objects.NotNull(animalV1Repository, nameof(animalV1Repository));

            _animalV1Repository = animalV1Repository;

            var collectionName = typeof(Animal).GetCustomAttribute<BsonDiscriminatorAttribute>()?.Discriminator;

            Require.Strings.NotNullOrWhiteSpace(collectionName, nameof(collectionName));

            _animalV2Collection = database.GetCollection<Animal>(collectionName);

            _mapper = GetMapper();
        }

        public async Task Execute()
        {
            await foreach (var animalV1 in _animalV1Repository.GetAllItemsAsync())
            {
                var animal = _mapper.Map<Animal>(animalV1);

                await _animalV2Collection.ReplaceOneAsync(a => a.Id == animal.Id, animal);
            }
        }

        private IMapper GetMapper()
        {
            var mapperConfiguration = new MapperConfiguration(
                mc =>
                {
                    mc.CreateMap<Animal202103241821, Animal>()
                    .ForMember(
                        x => x.Names,
                        o => o.MapFrom(
                            x => new List<LanguageValue>
                            { 
                                new LanguageValue
                                {
                                    Lang = "ua",
                                    Value = x.Name
                                } 
                            })
                    );

                    mc.CreateMap<WellKnownTag, WellKnownTag>();
                    mc.CreateMap<LanguageValue, LanguageValue>();
                });

            return mapperConfiguration.CreateMapper();
        }
    }
}
