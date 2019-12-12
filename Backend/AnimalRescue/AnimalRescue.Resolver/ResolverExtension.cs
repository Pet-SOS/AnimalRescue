using AnimalRescue.BusinessLogic;
using AnimalRescue.Contracts;
using AnimalRescue.DataAccess.Mongodb;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AnimalRescue.Resolver
{
    public static class ResolverExtension
    {
        public static void AddLayerResolver(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddConfigureMongoDb(configuration);

            services.AddScoped<IConfigurationService, ConfigurationService>();
        }
    }
}
