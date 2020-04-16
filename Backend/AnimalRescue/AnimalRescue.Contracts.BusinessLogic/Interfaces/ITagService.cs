using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using AnimalRescue.Contracts.BusinessLogic.Models;

using System;
using System.Collections.Generic;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface ITagService :
        IBlFullCrud<TagDto, TagDto, Guid>,
        IBlCreateIfNotExistAsync<IEnumerable<TagDto>>
    {
    }
}
