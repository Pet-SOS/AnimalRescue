using AnimalRescue.API.Core.Configuration.MappingProfiles;

using AutoMapper;

using Microsoft.Extensions.DependencyInjection;

using System;
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
                new ApiMappingProfile(), 
                new LocationMappingProfile(), 
            });

            var mappingConfig = new MapperConfiguration(mc => profiles.ForEach(x => mc.AddProfile(x)));
            IMapper mapper = mappingConfig.CreateMapper();

            services.AddSingleton(mapper);
        }
    }
}
