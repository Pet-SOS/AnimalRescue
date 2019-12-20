using AnimalRescue.BusinessLogic.Configurations.MappingProfiles;
using AnimalRescue.BusinessLogic.Services;
using AnimalRescue.Contracts;
using AnimalRescue.Contracts.Services;

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
            List<Profile> profiles)
        {
            profiles.Add(new AnimalMappingProfile());
            profiles.Add(new CmsConfigurationMappingProfile());

            services.AddScoped<IAnimalService, AnimalService>();
            services.AddScoped<IDocumentService, DocumentService>();
            services.AddScoped<IConfigurationService, ConfigurationService>();
			services.AddScoped<IBlogService, BlogService>();
		}
	}
}
