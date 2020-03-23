using System.Collections.Generic;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface ILanguageService
    {
        string GetCulture(string text);
        IEnumerable<string> AllCultures();
    }
}
