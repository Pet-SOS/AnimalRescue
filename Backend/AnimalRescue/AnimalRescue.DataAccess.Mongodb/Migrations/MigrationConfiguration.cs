using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Migrations.Engine;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Query;
using AnimalRescue.DataAccess.Mongodb.Repositories;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Migrations
{
    public static class MigrationConfiguration
    {
        public static string ResourceDataFolder { get; } = "Data";

        public static async Task ConfigureMigrationsAsync(IServiceProvider serviceProvider)
        {
            var migrationHistoryRepository = serviceProvider.GetRequiredService<IMigrationHistoryRepository>();
            var logger = serviceProvider.GetRequiredService<ILogger<MigrationHistoryRepository>>();
            var migrationHistory = await migrationHistoryRepository.GetAsync(new DbQuery());

            GetAvailableMigrations()
                .Where(x => IsNotAppliedMigration(x, migrationHistory))
                .ToList()
                .ForEach(async item => await ApplyMigration(serviceProvider, item, migrationHistoryRepository, logger));
        }

        private static bool IsNotAppliedMigration(Type migrationType, List<MigrationHistory> histories)
        {
            string migrationId = migrationType?.GetCustomAttribute<MigrationAttribute>()?.Name;
            bool result = histories.All(history => !string.Equals(migrationId, history.MigrationId));

            return result;
        }

        private static async Task ApplyMigration(
            IServiceProvider serviceProvider,
            Type item,
            IMigrationHistoryRepository migrationHistoryRepository,
            ILogger<MigrationHistoryRepository> logger)
        {
            var ctor = item
                .GetConstructors()
                .FirstOrDefault();

            var ctorParams = ctor?.GetParameters();

            var fullServices = ctorParams
                ?.Select(x => serviceProvider.GetRequiredService(x.ParameterType))
                .ToArray();

            IAnimalRescueMigration instance = (IAnimalRescueMigration)Activator.CreateInstance(item, fullServices);

            try
            {
                await instance.Execute();

                await migrationHistoryRepository.CreateAsync(new MigrationHistory
                {
                    MigrationId = item.GetCustomAttribute<MigrationAttribute>()?.Name
                });
            }
            catch (Exception exception)
            {
                logger.LogCritical(exception.Message);
            }
        }

        private static ICollection<Type> GetAvailableMigrations()
        {
            Assembly asm = typeof(IAnimalRescueMigration).Assembly;
            var migrationTypes = asm.GetTypes()
                .Where(type =>
                    typeof(IAnimalRescueMigration).IsAssignableFrom(type)
                    && type.GetCustomAttribute<MigrationAttribute>() != null)
                .ToArray();

            return migrationTypes;
        }
    }
}
