using AnimalRescue.BusinessLogic.Configurations.MappingProfiles;
using AnimalRescue.BusinessLogic.Queries;
using AnimalRescue.BusinessLogic.Services;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.BusinessLogic.Models.Additional;
using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;
using AnimalRescue.DataAccess.Mongodb;

using AutoMapper;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using System.Collections.Generic;

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
                new TagMappingProfile()
            });

            services.AddSingleton<IImageResize, ImageResize>();

            services.AddScoped<IBlFullCrud<AnimalDto, AnimalDto>, AnimalService>()
                .Decorate<IBlFullCrud<AnimalDto, AnimalDto>, TagDecorator<AnimalDto, AnimalDto>>();            
            services.AddScoped<IBlFullCrud<BlogDto, BlogDto>, BlogService>()
               .Decorate<IBlFullCrud<BlogDto, BlogDto>, TagDecorator<BlogDto, BlogDto>>();

            services.AddScoped<IFinancialReportService, FinancialReportService>();
            services.AddScoped<IDocumentService, DocumentService>();
            services.AddScoped<IConfigurationService, ConfigurationService>();
            services.AddScoped<ITagService, TagService>()
                .AddScoped<IStoryService, StoryService>()
                .AddScoped<IArticleService, ArticleService>();
        }
    }
}
