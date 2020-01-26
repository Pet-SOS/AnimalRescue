using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Query;
using AnimalRescue.Infrastructure.Validation;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class AnimalRepository : IAnimalRepository
    {
        private readonly IBaseCollection<Animal> baseCollection;

        public AnimalRepository(IBaseCollection<Animal> baseCollection)
        {
            Require.Objects.NotNull(baseCollection, nameof(baseCollection));

            this.baseCollection = baseCollection;
        }

        public async Task<Animal> CreateAsync(Animal instanse)
        {
            instanse.Id = string.Empty;
            instanse.CreatedAt = DateTime.Now;
            instanse.DateOfFound = DateTime.Now;
            instanse = await this.baseCollection.CreateAsync(instanse);            

            return instanse;
        }

        public async Task DeleteAsync(string id)
        {
            await this.baseCollection.RemoveAsync(id);
        }

        public async Task<Animal> GetAsync(string id)
        {
            var result = await this.baseCollection.GetAsync(id);

            return result;
        }

        public async Task UpdateAsync(Animal instanse)
        {
            var newData = instanse;
            var oldData = await this.baseCollection.GetAsync(instanse.Id);
            Require.Objects.NotNull<NotFoundException>(oldData, () => $"Animal with id: {instanse.Id} not found");

            newData.DateOfAdopted = oldData.DateOfAdopted;
            newData.DateOfFound = oldData.DateOfFound;
            await this.baseCollection.UpdateAsync(newData);
        }

        public async Task<List<Animal>> GetAsync(DbQuery query)
        {
            var result = await this.baseCollection.GetAsync(query);

            return result;
        }

        public async Task<int> GetCountAsync(DbQuery query)
        {
            var result = await this.baseCollection.GetCountAsync(query);

            return result;
        }
    }
}
