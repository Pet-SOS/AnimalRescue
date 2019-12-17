using AnimalRescue.Contracts.Services;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AnimalRescue.BusinessLogic
{
    public static class BusinessLogicConfigureExtension
    {
        public static void AddConfigureBusinessLogic(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IAnimalService, AnimalService>();
            services.AddScoped<IDocumentService, DocumentService>();
            services.AddScoped<IConfigurationService, ConfigurationService>();
        }
    }
}
