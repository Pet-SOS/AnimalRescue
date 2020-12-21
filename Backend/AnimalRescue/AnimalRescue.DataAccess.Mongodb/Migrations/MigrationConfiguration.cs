using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Migrations.Engine;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Query;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Migrations
{
    public static class MigrationConfiguration
    {
        public static async Task ConfigureMigrationsAsync(IServiceProvider serviceProvider)
        {
            var migrationHistoryRepository = serviceProvider.GetRequiredService<IBaseRepository<MigrationHistory>>();
            var logger = serviceProvider.GetRequiredService<ILogger<IBaseRepository<MigrationHistory>>>();
            var migrationHistory = await migrationHistoryRepository.GetAsync(new DbQuery());

            var m = GetAvailableMigrations().ToList();
            var migrations = GetAvailableMigrations()
                .Where(x => IsNotAppliedMigration(x, migrationHistory))
                .ToList();

            foreach (Type migration in migrations)
            {
                await ApplyMigration(serviceProvider, migration, migrationHistoryRepository, logger);
            }
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
            IBaseRepository<MigrationHistory> migrationHistoryRepository,
            ILogger<IBaseRepository<MigrationHistory>> logger)
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

        static Regex datetimeRegex = new Regex(
                "^(?<year>\\d{4})(?<month>\\d{2})(?<day>\\d{2})(?<hour>\\d{2})(?<minute>\\d{2})",
                RegexOptions.Compiled);
        class DateType
        {
            public DateTime Date { get; set; }
            public Type Type { get; set; }
        }

        private static ICollection<Type> GetAvailableMigrations()
        {
            Assembly asm = typeof(IAnimalRescueMigration).Assembly;
            var migrationTypes = asm.GetTypes()
                .Where(type =>
                    typeof(IAnimalRescueMigration).IsAssignableFrom(type)
                    && type.GetCustomAttribute<MigrationAttribute>() != null)
                .ToArray();

            migrationTypes.Select(
                    type =>
                    {
                        string name = type.GetCustomAttribute<MigrationAttribute>()?.Name ?? string.Empty;
                        Match match = datetimeRegex.Match(name);
                        return new DateType
                        {
                            Date = new DateTime(
                                int.Parse(match.Groups["year"].Value),
                                int.Parse(match.Groups["month"].Value),
                                int.Parse(match.Groups["day"].Value),
                                int.Parse(match.Groups["hour"].Value),
                                int.Parse(match.Groups["minute"].Value),
                                0),
                            Type = type
                        };
                    })
                .ToList()
                .Sort((left, right) => left.Date.CompareTo(right.Date));

            return migrationTypes;
        }
    }
}
