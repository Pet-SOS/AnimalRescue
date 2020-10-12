﻿using AnimalRescue.DataAccess.Mongodb.Configurations;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Migrations;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested;
using AnimalRescue.DataAccess.Mongodb.Models.Tag;
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
using AnimalRescue.DataAccess.Mongodb.Models.History;

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
                .AddSingleton<IQueryBuilder<DocumentCollection>, QueryBuilder<DocumentCollection>>()
                .AddSingleton<IQueryBuilder<Animal>, QueryBuilder<Animal>>()
                .AddSingleton<IQueryBuilder<Article>, QueryBuilder<Article>>()
                .AddSingleton<IQueryBuilder<Tags>, QueryBuilder<Tags>>()
                .AddSingleton<IQueryBuilder<TagLarge>, QueryBuilder<TagLarge>>()
                .AddSingleton<IQueryBuilder<WellKnownTag>, QueryBuilder<WellKnownTag>>()
                .AddSingleton<IQueryBuilder<Sequence>, QueryBuilder<Sequence>>()
                .AddSingleton<IQueryBuilder<Vacancy>, QueryBuilder<Vacancy>>()
                .AddSingleton<IQueryBuilder<Request>, QueryBuilder<Request>>()
                .AddSingleton<IQueryBuilder<UserRoleAction>, QueryBuilder<UserRoleAction>>()
                .AddSingleton<IQueryBuilder<FinancialReport>, QueryBuilder<FinancialReport>>()
                .AddSingleton<IQueryBuilder<Configuration<Contacts>>, QueryBuilder<Configuration<Contacts>>>()
                .AddSingleton<IQueryBuilder<SecurityToken>, QueryBuilder<SecurityToken>>()
                .AddSingleton<IQueryBuilder<RefreshToken>, QueryBuilder<RefreshToken>>()
                .AddSingleton<IQueryBuilder<OrganizationDocument>, QueryBuilder<OrganizationDocument>>()
                .AddSingleton<IQueryBuilder<Location>, QueryBuilder<Location>>()
                .AddSingleton<IQueryBuilder<ApplicationUser>, QueryBuilder<ApplicationUser>>()
                .AddSingleton<IQueryBuilder<MigrationHistory>, QueryBuilder<MigrationHistory>>()
                .AddSingleton<IQueryBuilder<History>, QueryBuilder<History>>();

            services
                .AddScoped<IMongoDatabase>(x => database)
                .AddScoped<IBucket, Bucket>()
                .AddScoped<IBaseCollection<DocumentCollection>, BaseCollection<DocumentCollection>>()
                .AddScoped<IBaseCollection<Animal>, BaseCollection<Animal>>()
                .AddScoped<IBaseCollection<Vacancy>, BaseCollection<Vacancy>>()
                .AddScoped<IBaseCollection<Article>, BaseCollection<Article>>()
                .AddScoped<IBaseCollection<FinancialReport>, BaseCollection<FinancialReport>>()
                .AddScoped<IBaseCollection<Location>, BaseCollection<Location>>()

                .AddScoped<IBaseCollection<Tags>, BaseCollection<Tags>>()
                .AddScoped<IBaseCollection<WellKnownTag>, BaseCollection<WellKnownTag>>()
                .AddScoped<IBaseCollection<TagLarge>, BaseCollection<TagLarge>>()
                .AddScoped<IBaseCollection<Sequence>, BaseCollection<Sequence>>()
                .AddScoped<IBaseCollection<Request>, BaseCollection<Request>>()
                .AddScoped<IBaseCollection<UserRoleAction>, BaseCollection<UserRoleAction>>()
                .AddScoped<IBaseCollection<History>, BaseCollection<History>>()
                .AddScoped<IBaseCollection<MigrationHistory>, BaseCollection<MigrationHistory>>()
                .AddScoped<IBaseCollection<RefreshToken>, BaseCollection<RefreshToken>>()

                .AddScoped<IBaseCollection<Configuration<Contacts>>, BaseCollection<Configuration<Contacts>>>()
                .AddScoped<IAnimalRepository, AnimalRepository>()
                .AddScoped<IFinancialReportRepository, FinancialReportRepository>()
                .AddScoped<IConfigurationRepository, ConfigurationRepository>()
                .AddScoped<IArticleRepository, ArticleRepository>()
                .AddScoped<ITagRepository, TagRepository>()
                .AddScoped<ISequenceRepository, SequenceRepository>()
                .AddScoped<IWellKnownTagRepository, WellKnownTagRepository>()
                .AddScoped<ITagLargeRepository, TagLargeRepository>()
                .AddScoped<IVacancyRepository, VacancyRepository>()
                .AddScoped<IRequestRepository, RequestRepository>()
                .AddScoped<IUserRoleActionRepository, UserRoleActionRepository>()
                .AddScoped<ILocationRepository, LocationRepository>()
                .AddScoped<IDocumentCollectionRepository, DocumentCollectionRepository>()
                .AddScoped<IMigrationHistoryRepository, MigrationHistoryRepository>()
                .AddScoped<IHistoryRepository, HistoryRepository>()
                .AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();

            services.AddScoped<IBaseCollection<SecurityToken>, BaseCollection<SecurityToken>>()
                .AddScoped<ISecurityTokenRepository, SecurityTokenRepository>();

            services.AddScoped<IBaseCollection<OrganizationDocument>, BaseCollection<OrganizationDocument>>()
                .AddScoped<IOrganizationDocumentRepository, OrganizationDocumentRepository>();
            services.AddScoped<IBaseCollection<ApplicationUser>, BaseCollection<ApplicationUser>>()
                .AddScoped<IUserRepository, UserRepository>();
        }

        public static async Task ConfigureMigrationsAsync(IServiceProvider serviceProvider) =>
            await MigrationConfiguration.ConfigureMigrationsAsync(serviceProvider);

    }
}