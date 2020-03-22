using AnimalRescue.Contracts.BusinessLogic.Interfaces;

using System.Collections.Generic;
using System.Linq;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class LanguageService : ILanguageService
    {
        private class Culture
        {
            public int Weight { get; set; }
            public string Characters { get; set; }
            public string Language { get; set; }
            public int Sum { get; set; }
        };

        private List<Culture> languages = new List<Culture> {
            new Culture { Weight = 1, Language =  "uk-ua",  Characters =  "АаБбВвГгҐґДдЕеЄєЖжЗзИиІіЇїЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЬьЮюЯя"},
            new Culture { Weight = 2, Language = "ru-ru",  Characters = "АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя" },
            new Culture { Weight = 3, Language =  "en-us",  Characters = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz"},
            new Culture { Weight = 4, Language =  "de-de",   Characters ="AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZzÄäÖöÜüẞß"}
        };

        public LanguageService()
        {
        } 

        public string GetCulture(string text)
        {
            var result = languages
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
    }
}
