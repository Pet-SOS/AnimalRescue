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
    internal class StoryRepository : IStoryRepository
    {
        private readonly IBaseCollection<Story> baseCollection;

        public StoryRepository(IBaseCollection<Story> baseCollection)
        {
            Require.Objects.NotNull(baseCollection, nameof(baseCollection));

            this.baseCollection = baseCollection;
        }

        public async Task<Story> CreateAsync(Story instanse)
        {
            instanse = await this.baseCollection.CreateAsync(instanse);            

            return instanse;
        }

        public async Task DeleteAsync(string id)
        {
            await this.baseCollection.RemoveAsync(id);
        }

        public async Task<Story> GetAsync(string id)
        {
            var result = await this.baseCollection.GetAsync(id);

            return result;
        }

        public async Task UpdateAsync(Story instanse)
        {
            var newData = instanse;
            var oldData = await this.baseCollection.GetAsync(instanse.Id);
            Require.Objects.NotNull<NotFoundException>(oldData, () => $"Story with id: {instanse.Id} not found");

            await this.baseCollection.UpdateAsync(newData);
        }

        public async Task<List<Story>> GetAsync(DbQuery query)
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
