using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IImageService :
        IBlCreateAsync<Guid?, IFormFile>,
        IBlCreateAsync<List<Guid>, IList<IFormFile>>
    {
    }
}
