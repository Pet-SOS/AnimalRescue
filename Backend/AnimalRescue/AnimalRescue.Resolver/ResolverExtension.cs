using AnimalRescue.BusinessLogic;
using AnimalRescue.DataAccess.Mongodb;

using AutoMapper;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using System.Collections.Generic;

namespace AnimalRescue.Resolver
{
    public static class ResolverExtension
    {
        public static void AddLayerResolver(
            this IServiceCollection services, 
            IConfiguration configuration, 
            List<Profile> profiles)
        {
            if (profiles == null)
            {
                profiles = new List<Profile>();
            }

            services.AddConfigureMongoDb(configuration);
            services.AddConfigureBusinessLogic(configuration, profiles);

            var mappingConfig = new MapperConfiguration(mc => profiles.ForEach(x => mc.AddProfile(x)));
            IMapper mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);
        }
    }
}
