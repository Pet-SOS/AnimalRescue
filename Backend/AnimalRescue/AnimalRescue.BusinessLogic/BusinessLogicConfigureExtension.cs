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
using AnimalRescue.Contracts.BusinessLogic.Services;
using AnimalRescue.DataAccess.Mongodb;
using AnimalRescue.DataAccess.Mongodb.Enums;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Infrastructure.Configuration;

using AutoMapper;

using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
                new TagMappingProfile(),
                new WellKnownTagMappingProfile(),
                new SequenceMappingProfile(),
                new BucketItemMappingProfile(),
                new EmployeeMappingProfile(),
                new ApplicationUserMappingProfile(),
                new RequestMappingProfile(),
                new HistoryProfile()
            });

            IPublisherSettings publisherSettings = configuration.GetTypedSection<PublisherSettings>(nameof(PublisherSettings));
            services.AddSingleton<IPublisherSettings>(p => publisherSettings);
            services.AddSingleton<IEventEmittingService, EventEmittingService>();

            services.AddScoped<IRecoverDataService, RecoverDataService>();
            services.AddScoped<ILocationService, LocationService>();
            services.AddScoped<IBlFullCrud<AnimalDto, AnimalDto, Guid>, AnimalService>()
                .Decorate<IBlFullCrud<AnimalDto, AnimalDto, Guid>, TagDecorator<AnimalDto, AnimalDto, Guid>>()
                .Decorate<IBlFullCrud<AnimalDto, AnimalDto, Guid>, HistoryDecorator<AnimalDto, AnimalDto, Guid>>();
            services.AddScoped<IBlFullCrud<BlogDto, BlogDto, Guid>, BlogService>()
               .Decorate<IBlFullCrud<BlogDto, BlogDto, Guid>, TagDecorator<BlogDto, BlogDto, Guid>>();
            services.AddScoped<IBlFullCrud<EmployeeDto, EmployeeDto, Guid>, EmployeeService>();
            services.AddScoped<IBlFullCrud<RequestDto, RequestDto, Guid>, RequestService>()
                .Decorate<IBlFullCrud<RequestDto, RequestDto, Guid>, HistoryDecorator<RequestDto, RequestDto, Guid>>();

            services.AddSingleton<IImageSizeConfiguration, ImageSizeConfiguration>();
            services.AddScoped<IImageService, ImageService>();

            services.AddScoped<IDocumentCollectionService, DocumentCollectionService>();
            services.AddScoped<IFinancialReportService, FinancialReportService>();
            services.AddScoped<IDocumentService, DocumentService>();
            services.AddScoped<IConfigurationService, ConfigurationService>();
            services.AddScoped<ITagService, TagService>()
                .Decorate<ITagService, HistoryTagDecorator>();
            services.AddScoped<IWellKnownTagService, WellKnownTagService>();
            services.AddScoped<IJwtFactory, JwtFactory>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IEmailSender, EmailSender>();
            services.AddScoped<IOrganizationDocumentService, OrganizationDocumentService>();
            services.AddScoped<IBlFullCrud<HistoryDto, HistoryDto, Guid>, HistoryService>();

            services.AddSingleton<ILanguageConfiguration, LanguageConfiguration>();
            services.AddScoped<ILanguageService, LanguageService>();
            services.AddScoped<ISequenceService, SequenceService>();
            services.AddScoped<IUsersManagementService, UsersManagementService>();

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
            CreateRolesAsync(serviceProvider, configuration).GetAwaiter().GetResult();
            MongoDbConfigureExtension.ConfigureMigrationsAsync(serviceProvider).GetAwaiter().GetResult();
        }

        private static async Task CreateRolesAsync(IServiceProvider serviceProvider, IConfiguration configuration)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var roleNames = Enum.GetValues(typeof(UserRole)).Cast<UserRole>().Select(x => x.ToString()).ToList();

            foreach (var roleName in roleNames)
            {
                var roleExist = await roleManager.RoleExistsAsync(roleName);
                if (!roleExist)
                {
                    await roleManager.CreateAsync(new ApplicationRole(roleName));
                }
            }

            var adminSettings = configuration.GetTypedSection<AdminSettings>("AdminDetail");
            var user = await userManager.FindByEmailAsync(adminSettings.Email);
            if (user == null)
            {
                var admin = new ApplicationUser
                {

                    UserName = adminSettings.Email,
                    Email = adminSettings.Email,
                    FirstName = "Super",
                    LastName = "User",
                    ProfilePhoto = null,
                    EmailConfirmed = true
                };

                var createPowerUser = await userManager.CreateAsync(admin, adminSettings.Password);
                if (createPowerUser.Succeeded)
                {
                    await userManager.AddToRoleAsync(admin, UserRole.Admin.ToString());
                }
            }
        }
    }
}
