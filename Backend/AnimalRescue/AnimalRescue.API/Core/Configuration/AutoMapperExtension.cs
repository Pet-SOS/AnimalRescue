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
            profiles.Add(new ApiMappingProfile());

            var mappingConfig = new MapperConfiguration(mc => profiles.ForEach(x => mc.AddProfile(x)));
            IMapper mapper = mappingConfig.CreateMapper();

            services.AddSingleton(mapper);
        }
    }
}
