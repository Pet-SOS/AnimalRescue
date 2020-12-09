using AnimalRescue.BusinessLogic.BackgroundServices;
using AnimalRescue.BusinessLogic.Configurations;
using AnimalRescue.BusinessLogic.Configurations.MappingProfiles;
using AnimalRescue.BusinessLogic.Queries;
using AnimalRescue.BusinessLogic.Services;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Interfaces.UsersManagement;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.BusinessLogic.Models.Additional;
using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;
using AnimalRescue.Contracts.BusinessLogic.Models.History;
using AnimalRescue.Contracts.BusinessLogic.Models.Messages;
using AnimalRescue.Contracts.BusinessLogic.Services;
using AnimalRescue.DataAccess.Mongodb;
using AnimalRescue.Infrastructure.Configuration;

using AutoMapper;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using System;
using System.Collections.Generic;
using System.Collections.Immutable;

namespace AnimalRescue.BusinessLogic
{
    public static class BusinessLogicConfigureExtension
    {
        public static void AddConfigureBusinessLogic(
            this IServiceCollection services,
            IConfiguration configuration,
            out List<Profile> profiles)
        {
            profiles = new List<Profile>();

            services.AddConfigureMongoDb(configuration);

            profiles.AddRange(new Profile[] {
                new LocationMappingProfile(),
                new AnimalMappingProfile(),
                new StoryMappingProfile(),
                new BlogMappingProfile(),
                new ArticleMappingProfile(),
                new CmsConfigurationMappingProfile(),
                new DonationConfigurationMappingProfile(),
                new FinancialReportMappingProfile(),
                new FinancialReportYearInfoMappingProfile(),
                new TagMappingProfile(),
                new WellKnownTagMappingProfile(),
                new TagLargeMappingProfile(),
                new SequenceMappingProfile(),
                new BucketItemMappingProfile(),
                new VacancyMappingProfile(),
                new ApplicationUserMappingProfile(),
                new RequestMappingProfile(),
                new HistoryProfile()
            });

            services.Configure<AdminSettings>(configuration.GetSection("AdminDetail"));

            IPublisherSettings publisherSettings = configuration.GetTypedSection<PublisherSettings>(nameof(PublisherSettings));
            services.AddSingleton<IPublisherSettings>(p => publisherSettings);
            ITelegramPublisherSettings telegramMessagesPublisherSettings = configuration.GetTypedSection<TelegramPublisherSettings>(nameof(TelegramPublisherSettings));
            services.AddSingleton<ITelegramPublisherSettings>(p => telegramMessagesPublisherSettings);
            IEmailPublisherSettings adoptAnimalEmailPublisherSettings = configuration.GetTypedSection<EmailPublisherSettings>("AdoptAnimalEmailPublisherSettings");
            services.AddSingleton<IEmailPublisherSettings>(p => adoptAnimalEmailPublisherSettings);

            services.AddSingleton<IEventEmittingService, EventEmittingService>();

            services.AddScoped<IRecoverDataService, RecoverDataService>();
            services.AddScoped<ILocationService, LocationService>();
            services.AddScoped<IBlFullCrud<AnimalDto, AnimalDto, Guid>, AnimalService>()
                .Decorate<IBlFullCrud<AnimalDto, AnimalDto, Guid>, TagDecorator<AnimalDto, AnimalDto, Guid>>();
            services.AddScoped<IBlFullCrud<BlogDto, BlogDto, Guid>, BlogService>()
               .Decorate<IBlFullCrud<BlogDto, BlogDto, Guid>, TagDecorator<BlogDto, BlogDto, Guid>>();
            services.AddScoped<IBlFullCrud<VacancyDto, VacancyDto, Guid>, VacancyService>();

            services.AddScoped<IRequestService, RequestService>();

            services.AddSingleton<IImageSizeConfiguration, ImageSizeConfiguration>();
            services.AddScoped<IImageService, ImageService>();

            services.AddScoped<IDocumentCollectionService, DocumentCollectionService>();
            services.AddScoped<IFinancialReportService, FinancialReportService>();
            services.AddScoped<IFinancialReportYearInfoService, FinancialReportYearInfoService>();
            services.AddScoped<IDocumentService, DocumentService>();
            services.AddScoped<IConfigurationService, ConfigurationService>();
            services.AddScoped<ITagService, TagService>();
            services.AddScoped<IWellKnownTagService, WellKnownTagService>();
            services.AddScoped<ITagLargeService, TagLargeService>();
            services.AddScoped<IJwtFactory, JwtFactory>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IEmailSender, EmailSender>();
            services.AddScoped<IOrganizationDocumentService, OrganizationDocumentService>();
            services.AddScoped<IBlFullCrud<HistoryDto, HistoryDto, Guid>, HistoryService>();

            services.AddSingleton<ILanguageConfiguration, LanguageConfiguration>();
            services.AddScoped<ILanguageService, LanguageService>();
            services.AddScoped<ISequenceService, SequenceService>();
            services.AddScoped<IUsersManagementService, UsersManagementService>();

            services.AddScoped<IRequestAdoptAnimalService, RequestAdoptAnimalService>();
            services.AddScoped<IEmergencyRequestService, EmergencyRequestService>();

            BackgroundServices(services, configuration);
        }

        private static void BackgroundServices(IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<UnlinkedFileSearchSettings>(configuration.GetSection(nameof(UnlinkedFileSearchSettings)));
            services.AddTransient<UnlinkedFileSearchService>();
            services.AddHostedService<UnlinkedFileSearchWorker>();
        }

        public static void EnsureUpdate(IServiceProvider serviceProvider, IConfiguration configuration)
        {
            MongoDbConfigureExtension.ConfigureMigrationsAsync(serviceProvider).GetAwaiter().GetResult();
        }
    }
}
