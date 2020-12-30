using AnimalRescue.DataAccess.Mongodb.Configurations;
using AnimalRescue.DataAccess.Mongodb.Decorators;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Migrations;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.QueryBuilders;
using AnimalRescue.DataAccess.Mongodb.Repositories;
using AnimalRescue.Infrastructure.Configuration;

using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using MongoDB.Driver;

using MongoDbGenericRepository;

using System;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb
{
    public static class MongoDbConfigureExtension
    {
        public static void AddConfigureMongoDb(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            var dbSettings = configuration.GetTypedSection<MongoDbSettings>(nameof(MongoDbSettings));

            var client = new MongoClient(dbSettings.ConnectionString);
            if (client is null)
            {
                throw new ArgumentNullException(nameof(client));
            }
            IMongoDatabase database = client.GetDatabase(dbSettings.DatabaseName);

            // Important! Use Mongo connectionString instead of MongoCredentials with asp.net identity 2.0+
            // sasl protocol mechanism SCRAM-SHA-1
            var mongoDbContext = new MongoDbContext(database);

            services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequireUppercase = true;
                options.Password.RequiredLength = 8;
                options.Password.RequiredUniqueChars = 1;

                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(10);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.AllowedForNewUsers = true;

                options.User.AllowedUserNameCharacters =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
                options.User.RequireUniqueEmail = true;

            }).AddMongoDbStores<IMongoDbContext>(mongoDbContext)
            .AddDefaultTokenProviders();

            services
                .AddSingleton<IMongoDbSettings>(p => dbSettings)
                .AddSingleton<IBucketSettings>(p => dbSettings)
                .AddSingleton<IMongoClient, MongoClient>(p => client)
                .AddSingleton<IAliasStore, AliasStore>()
                .AddSingleton<IQueryFilterBuilder, QueryFilterBuilder>()
                .AddSingleton<IQuerySortBuilder, QuerySortBuilder>()
                .AddSingleton(typeof(IQueryBuilder<>), typeof(QueryBuilder<>));

            services
                .AddScoped<IMongoDatabase>(x => database)
                .AddScoped<IBucket, Bucket>()
                .AddScoped(typeof(IBaseCollection<>), typeof(BaseCollection<>))
                .AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>))

                .AddScoped<IChatRepository, ChatRepository>()
                .AddScoped(typeof(IConfigurationRepository<>), typeof(ConfigurationRepository<>))
                .AddScoped<ISequenceRepository, SequenceRepository>()
                .AddScoped<IWellKnownTagRepository, WellKnownTagRepository>()
                .AddScoped<ITagLargeRepository, TagLargeRepository>()
                .AddScoped<IUserRoleActionRepository, UserRoleActionRepository>()
                .AddScoped<IRefreshTokenRepository, RefreshTokenRepository>()
                .AddScoped<ISecurityTokenRepository, SecurityTokenRepository>()
                .AddScoped<IBaseRepository<OrganizationDocument>, OrganizationDocumentRepository>()
                .AddScoped<IFinancialReportYearInfoRepository, FinancialReportYearInfoRepository>();

            services
                .AddScoped<IBaseRepository<Animal>, AnimalRepository>()
                .Decorate<IBaseRepository<Animal>, HistoryDecorator<Animal>>();

            services
                .AddScoped<IBaseRepository<Request>, BaseRepository<Request>>()
                .Decorate<IBaseRepository<Request>, HistoryDecorator<Request>>();

            services
                .AddScoped<ITagRepository, TagRepository>()
                .Decorate<ITagRepository, TagHistoryDecorator>();
        }

        public static async Task ConfigureMigrationsAsync(IServiceProvider serviceProvider) =>
            await MigrationConfiguration.ConfigureMigrationsAsync(serviceProvider);

    }
}
