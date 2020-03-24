using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations;
using AnimalRescue.Infrastructure.Configuration;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using AnimalRescue.Infrastructure.Validation;

namespace AnimalRescue.Contracts.BusinessLogic.Models.Additional
{
    public class LanguageConfiguration : ILanguageConfiguration
    {
        public IList<Culture> Languages { get; }

        public LanguageConfiguration(IConfiguration configuration)
        {
            Require.Objects.NotNull(configuration, nameof(configuration));

            Languages = configuration.GetTypedSection<List<Culture>>(nameof(LanguageConfiguration));
        }
    }
}
