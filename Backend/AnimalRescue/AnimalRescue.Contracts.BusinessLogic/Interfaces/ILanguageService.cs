using System.Threading.Tasks;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface ILanguageService
    {
        Task<string> GetCulture(string text);
    }
}
