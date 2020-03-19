using AnimalRescue.BusinessLogic.Configurations.MappingProfiles;
using AnimalRescue.BusinessLogic.Queries;
using AnimalRescue.BusinessLogic.Services;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.BusinessLogic.Models.Additional;
using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;
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
                new AnimalMappingProfile(),
                new StoryMappingProfile(),
                new BlogMappingProfile(),
                new ArticleMappingProfile(),
                new CmsConfigurationMappingProfile(),
                new DonationConfigurationMappingProfile(),
                new FinancialReportMappingProfile(),
                new TagMappingProfile(),
                new BucketItemMappingProfile(),
                new EmployeeMappingProfile(),
                new DocumentMappingProfile()
            });

            services.AddScoped<IBlFullCrud<AnimalDto, AnimalDto>, AnimalService>()
                .Decorate<IBlFullCrud<AnimalDto, AnimalDto>, TagDecorator<AnimalDto, AnimalDto>>();            
            services.AddScoped<IBlFullCrud<BlogDto, BlogDto>, BlogService>()
               .Decorate<IBlFullCrud<BlogDto, BlogDto>, TagDecorator<BlogDto, BlogDto>>();
            services.AddScoped<IBlFullCrud<EmployeeDto, EmployeeDto>, EmployeeService>();

            services.AddSingleton<IImageSizeConfiguration, ImageSizeConfiguration>();
            services.AddScoped<IImageService, ImageService>();

            services.AddScoped<IDocumentCollectionService, DocumentCollectionService>();
            services.AddScoped<IFinancialReportService, FinancialReportService>();
            services.AddScoped<IDocumentService, DocumentService>();
            services.AddScoped<IConfigurationService, ConfigurationService>();
            services.AddScoped<ITagService, TagService>();
            services.AddScoped<IJwtFactory, JwtFactory>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IEmailSender, EmailSender>();
        }

        public static void EnsureUpdate(IServiceProvider serviceProvider, IConfiguration configuration)
        {
            CreateRoles(serviceProvider, configuration).GetAwaiter().GetResult();
        }

        private static async Task CreateRoles(IServiceProvider serviceProvider, IConfiguration configuration)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var roleNames = Enum.GetValues(typeof(UserRole)).Cast<UserRole>().Select(x => x.ToString()).ToList();
            IdentityResult roleResult;
            foreach (var roleName in roleNames)
            {
                var roleExist = await roleManager.RoleExistsAsync(roleName);
                if (!roleExist)
                {
                    roleResult = await roleManager.CreateAsync(new ApplicationRole(roleName));
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
