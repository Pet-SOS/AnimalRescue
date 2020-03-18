using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class LanguageService : ILanguageService
    {
        public LanguageService()
        {
        }

        public Task<string> GetCulture(string text)
        {
            var res = "en-us";
            return Task.Run(() => res);
        }
    }
}
