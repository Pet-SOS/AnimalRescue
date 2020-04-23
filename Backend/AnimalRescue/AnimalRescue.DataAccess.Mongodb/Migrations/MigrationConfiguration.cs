using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models.Tag;
using AnimalRescue.Infrastructure.Utilities;

using Microsoft.Extensions.DependencyInjection;

using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Migrations
{
    public static class MigrationConfiguration
    {
        private const string DataFolder = "Data";
        public static async Task ConfigureMigrationsAsync(IServiceProvider serviceProvider)
        {
            await SetUpDataBase<IWellKnownTagRepository, WellKnownTag>(
                serviceProvider,
                "tags.json",
                (repo, collection) => repo.WhereByIdAsync(collection),
                (repo, collection) => repo.CreateAsync(collection),
                (x, y) => x.Id == y.Id);
        }

        private static async Task SetUpDataBase<TRepository, TEntity>(
            IServiceProvider serviceProvider,
            string fileName,
            Func<TRepository, List<TEntity>, Task<List<TEntity>>> searchFunc,
            Func<TRepository, List<TEntity>, Task<IEnumerable<TEntity>>> createFunc,
            Func<TEntity, TEntity, bool> compareFunc)

        {
            var location = System.Reflection.Assembly.GetEntryAssembly().Location;
            var directory = Path.GetDirectoryName(location);
            string fullPath = Path.Combine(directory, DataFolder, fileName);

            if (!File.Exists(fullPath))
            {
                return;
            }

            string content = await File.ReadAllTextAsync(fullPath);

            List<TEntity> collection = JsonConvert.DeserializeObject<List<TEntity>>(content);
            
            TRepository repository = serviceProvider.GetRequiredService<TRepository>();
            List<TEntity> existingCollection = await searchFunc(repository, collection);
            collection = collection
                .Except(existingCollection, new EntityComparer<TEntity>(compareFunc))
                .ToList();

            if (collection.Count > 0)
            {
                await createFunc(repository, collection);
            }
        }
    }
}
