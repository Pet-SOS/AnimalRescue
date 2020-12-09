using AnimalRescue.API.Core.Configuration.MappingProfiles;
using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;

namespace AnimalRescue.API.Core.Configuration
{
    public static class AutoMapperExtension
    {
        public static void AddConfigureAutoMapper(
            this IServiceCollection services,  
            List<Profile> profiles)
        {
            profiles.AddRange(new List<Profile> {
                new LocationMappingProfile(),
                new DonationConfigurationMappingProfile(),
                new CmsConfigurationMappingProfile(),
                new AnimalMappingProfile(),
                new FinancialReportMappingProfile(),
                new FinancialReportsInfoMappingProfile(),
                new FinancialReportYearInfoMappingProfile(),
                new TagMappingProfile(),
                new TagLargeMappingProfile(),
                new LanguageValueMappingProfile(),
                new WellKnownTagMappingProfile(),
                new VacancyMappingProfile(),
                new BlogMappingProfile(),
                new StoryMappingProfile(),
                new ArticleMappingProfile(),
                new RequestMappingProfile(),
                new HistoryProfile(),
                new RequestAdoptAnimalMappingProfile()
            });

            var mappingConfig = new MapperConfiguration(mc => profiles.ForEach(x => mc.AddProfile(x)));
            IMapper mapper = mappingConfig.CreateMapper();

            services.AddSingleton(mapper);
        }
    }
}
