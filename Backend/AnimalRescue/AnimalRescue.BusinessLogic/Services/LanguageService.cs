using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class LanguageService : ILanguageService
    {
        public LanguageService()
        {
        }

        public Task<string> GetCulture(string inputString)
        {
            const string englishChars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
            const string russianChars = "АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя";
            const string ukrainianChars = "АаБбВвГгҐґДдЕеЄєЖжЗзИиІіЇїЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЬьЮюЯя";
            const string germanChars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZzÄäÖöÜüẞß";

            var MatchNumberEnglish = GetMatchedCharsCount(inputString, englishChars);
            var MatchNumberGerman = GetMatchedCharsCount(inputString, germanChars);
            var MatchNumberUkrainian = GetMatchedCharsCount(inputString, ukrainianChars);
            var MatchNumberRussian = GetMatchedCharsCount(inputString, russianChars);

            int[] langArr = new int[] { MatchNumberUkrainian, MatchNumberRussian, MatchNumberEnglish, MatchNumberGerman };
            var maxVal = langArr.Max();
            int p = Array.IndexOf(langArr, maxVal);

            string res;
            switch (p)
            {
                case 0:
                    res = "uk-ua";
                    break;
                case 1:
                    res = "ru-ru";
                    break;
                case 2:
                    res = "en-us";
                    break;
                case 3:
                    res = "de-de";
                    break;
                default:
                    res = "uk-ua";
                    break;
            }

            return Task.Run(() => res);
        }

        private int GetMatchedCharsCount(string inputString, string langCharSet)
        {
            int number = 0;
            foreach (char ch in inputString)
            {
                var contains = langCharSet.Contains(ch);
                if (contains)
                {
                    number++;
                }
            }
            return number;
        }

    }
}
