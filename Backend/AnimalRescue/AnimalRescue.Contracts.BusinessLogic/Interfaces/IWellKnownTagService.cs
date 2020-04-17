using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using AnimalRescue.Contracts.BusinessLogic.Models.Tag;

using System.Collections.Generic;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IWellKnownTagService :
        IBlFullCrud<WellKnownTagDto, WellKnownTagDto, string>,
        IBlCreateIfNotExistAsync<IEnumerable<WellKnownTagDto>>
    {
    }
}
