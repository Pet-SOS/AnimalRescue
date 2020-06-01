using System.IO;
using Microsoft.Extensions.Configuration;

namespace AnimalRescue.Infrastructure.Configuration
{
    public static class ConfigurationUtil
    {
        public static T GetTypedSection<T>(this IConfiguration configuration, string name) 
            where T : new()
        {
            var section = new T();
            configuration.GetSection(name).Bind(section);
            return section;
        }
        
        public static IConfigurationRoot GetConfiguration(string fileName = "appsettings.json") 
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile(fileName, optional: true, reloadOnChange: true);

            IConfigurationRoot configuration = builder.Build();

            return configuration;
        }
        
    }
}
