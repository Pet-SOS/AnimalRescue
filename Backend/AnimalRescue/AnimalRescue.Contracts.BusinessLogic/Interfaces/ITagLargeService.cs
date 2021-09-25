using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using AnimalRescue.Contracts.BusinessLogic.Models.Tag;

using System.Collections.Generic;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface ITagLargeService :
        IBlFullCrud<TagLargeDto, TagLargeDto, string>,
        IBlCreateIfNotExistAsync<IEnumerable<TagLargeDto>>
    {
    }
}
