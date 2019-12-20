using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Query;
using AnimalRescue.Models.DTO.Models;

using AutoMapper;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class AnimalRepository : IAnimalRepository
    {
        private readonly IBaseCollection<Animal> baseCollection;
        private readonly IMapper mapper;

        public AnimalRepository(IBaseCollection<Animal> baseCollection, IMapper mapper)
        {
            this.baseCollection = baseCollection;
            this.mapper = mapper;
        }

        public async Task<AnimalDto> CreateAnimalAsync(AnimalDto instanse)
        {
            var data = mapper.Map<AnimalDto, Animal>(instanse);
            data.DateOfFound = DateTimeOffset.Now;
            var result = await this.baseCollection.CreateAsync(data);
            
            instanse = mapper.Map<Animal, AnimalDto>(result);

            return instanse;
        }

        public async Task DeleteAnimalAsync(string id)
        {
            await this.baseCollection.RemoveAsync(id);
        }

        public async Task<AnimalDto> GetAnimalAsync(string id)
        {
            var data = await this.baseCollection.GetAsync(id);

            var result = mapper.Map<Animal, AnimalDto>(data);

            return result;
        }

        public async Task UpdateAnimalAsync(AnimalDto instanse)
        {
            var newData = mapper.Map<AnimalDto, Animal>(instanse);
            var oldData = await this.baseCollection.GetAsync(newData.Id);
            newData.DateOfAdopted = oldData.DateOfAdopted;
            newData.DateOfFound = oldData.DateOfFound;
            await this.baseCollection.UpdateAsync(newData);
        }

        public async Task<List<AnimalDto>> GetAnimalsAsync(DbQuery query)
        {
            var data = await this.baseCollection.GetAsync(query);

            var result = mapper.Map<List<Animal>, List<AnimalDto>>(data);

            return result;
        }

        public async Task<int> GetAnimalCountAsync(DbQuery query)
        {
            var result = await this.baseCollection.GetCountAsync(query);

            return result;
        }
    }
}
