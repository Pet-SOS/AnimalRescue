using AnimalRescue.Infrastructure.Utilities;

using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Migrations.Engine
{
    public static class MigrationExtensions
    {
        public static string ResourceDataFolder { get; } = "Data";

        public static async Task SetUpDataBaseFromJsonFileAsync<TRepository, TEntity>(
            this TRepository repository,
            string fileName,
            Func<TRepository, List<TEntity>, Task<List<TEntity>>> searchFunc,
            Func<TRepository, List<TEntity>, Task<IEnumerable<TEntity>>> createFunc,
            Func<TEntity, TEntity, bool> compareFunc)

        {
            string content = GetResourceTextFile(fileName);

            if (string.IsNullOrWhiteSpace(content))
            {
                return;
            }

            List<TEntity> collection = JsonConvert.DeserializeObject<List<TEntity>>(content);

            List<TEntity> existingCollection = await searchFunc(repository, collection);
            
            collection = collection
                .Except(existingCollection, new EntityComparer<TEntity>(compareFunc))
                .ToList();

            if (collection.Count > 0)
            {
                await createFunc(repository, collection);
            }
        }

        public static async Task SetUpDataBaseFromJsonFileAsync<TRepository, TEntity>(
            this TRepository repository,
            string fileName,
            Func<TRepository, TEntity, Task> createFunc)

        {
            string content = GetResourceTextFile(fileName);

            if (string.IsNullOrWhiteSpace(content))
            {
                return;
            }

            TEntity item = JsonConvert.DeserializeObject<TEntity>(content);

            if (item != null)
            {
                await createFunc(repository, item);
            }
        }

        private static string GetResourceTextFile(string filename)
        {
            StringBuilder stringBuilder = new StringBuilder();
            try
            {
                using (Stream stream = typeof(MigrationConfiguration).Assembly
                    .GetManifestResourceStream($"{Assembly.GetCallingAssembly().GetName().Name}.{ResourceDataFolder}.{filename}"))
                {
                    using (StreamReader reader = new StreamReader(stream))
                    {
                        string line;
                        while ((line = reader.ReadLine()) != null)
                        {
                            stringBuilder.Append(line);
                        }
                    }
                }
            }
            catch (Exception exp)
            {
                Console.WriteLine(exp.Message);
                return null;
            }

            return stringBuilder.ToString();
        }
    }
}
