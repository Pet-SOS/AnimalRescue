using AnimalRescue.BusinessLogic.Configurations.MappingProfiles;
using AnimalRescue.BusinessLogic.Services;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
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
                new TagMappingProfile()
            });

            services.AddScoped<IAnimalService, AnimalService>();
            services.AddScoped<IDocumentService, DocumentService>();
            services.AddScoped<IConfigurationService, ConfigurationService>();
            services
                .AddScoped<IBlogService, BlogService>()
                .AddScoped<IStoryService, StoryService>()
                .AddScoped<IArticleService, ArticleService>()
                .AddScoped<ITagService, TagService>();
        }
	}
}
