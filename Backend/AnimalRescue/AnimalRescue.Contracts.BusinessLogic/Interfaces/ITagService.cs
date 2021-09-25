using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using AnimalRescue.Contracts.BusinessLogic.Models;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface ITagService :
        IBlFullCrud<TagDto, TagDto, Guid>,
        IBlCreateIfNotExistAsync<IEnumerable<TagDto>>
    {
        Task<IEnumerable<TagDto>> WhereAsync(IEnumerable<TagDto> value);
    }
}
