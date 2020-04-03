using System.Collections.Generic;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface ILanguageConfiguration
    {
        IList<Culture> Languages { get; }
    }
}
