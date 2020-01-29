using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IImageService :
        IBlCreateAsync<Dictionary<string, Guid>, IFormFile>,
        IBlCreateAsync<List<Dictionary<string, Guid>>, IList<IFormFile>>
    {
    }
}
