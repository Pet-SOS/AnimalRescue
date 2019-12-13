using AnimalRescue.DataAccess.Contracts.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Configurations;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Models.DTO.Models;

using AutoMapper;

using MongoDB.Driver;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Collections
{
    public class AnimalCollection : BaseCollection<Animal>,
        IAnimalRepository
    {
        public AnimalCollection(IMongoClient client, IMongoDbSettings settings, IMapper mapper)
            : base(client, settings, mapper, nameof(Animal))
        {
        }

        public async Task<AnimalModel> CreateAnimalAsync(AnimalModel instanse)
        {
            var data = ConvertOneFrom(instanse);
            data.DateOfFound = DateTimeOffset.Now;
            var result = await base.CreateAsync(data);
            instanse = ConvertOneTo<AnimalModel>(result);

            return instanse;
        }

        public async Task DeleteAnimalAsync(string id)
        {
            await base.RemoveAsync(id);
        }

        public async Task DeleteAnimalAsync(AnimalModel instanse)
        {
            var data = ConvertOneFrom(instanse);
            await base.RemoveAsync(data);
        }

        public async Task<List<AnimalModel>> GetAnimalsAsync(int currentPage = 1, int pageSize = 10)
        {
            var data = await GetAsync(currentPage, pageSize);
            var result = ConvertListTo<AnimalModel>(data);

            return result;
        }

        public async Task<AnimalModel> GetAnimalAsync(string id)
        {
            var data = await base.GetAsync(id);

            var result = ConvertOneTo<AnimalModel>(data);

            return result;
        }

        public async Task UpdateAnimalAsync(AnimalModel instanse)
        {
            var newData = ConvertOneFrom(instanse);
            var oldData = await base.GetOneByIdAsync(newData.Id);
            newData.DateOfAdopted = oldData.DateOfAdopted;
            newData.DateOfFound = oldData.DateOfFound;
            await UpdateAsync(newData);
        }
    }
}
