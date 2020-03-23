using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using System.Linq;
using AnimalRescue.Infrastructure.Validation;
using System.Collections.Generic;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class LanguageService : ILanguageService
    {
        private readonly ILanguageConfiguration _languageConfiguration;

        public LanguageService(ILanguageConfiguration languageConfiguration)
        {
            Require.Objects.NotNull(languageConfiguration, nameof(languageConfiguration));
            Require.Collections.NotEmpty(languageConfiguration.Languages, nameof(languageConfiguration.Languages));

            _languageConfiguration = languageConfiguration;
        }

        public string GetCulture(string text)
        {
            var result = _languageConfiguration.Languages
                 .Select(x =>
                 {
                     x.Sum = GetMatchedCharsCount(text, x.Characters);
                     return x;
                 })
                 .OrderByDescending(x => x.Sum)
                 .ThenBy(x => x.Weight)
                 .FirstOrDefault(x => x.Sum != 0)
                 ?.Language;

            return result;
        }

        private static int GetMatchedCharsCount(string inputString, string langCharSet)
        {
            return inputString.Sum(ch => langCharSet.Contains(ch) ? 1 : 0);
        }

        public IEnumerable<string> AllCultures()
        {
            return _languageConfiguration.Languages.Select(x => x.Language);
        }
    }
}
