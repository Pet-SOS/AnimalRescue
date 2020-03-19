using AnimalRescue.Contracts.BusinessLogic.Models.Document;
using AnimalRescue.Contracts.Common.Interfaces.CRUD;

using Microsoft.AspNetCore.Http;

using System;
using System.Collections.Generic;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD
{
    public interface IBlUploadFileAsync :
        IBaseUploadFileAsync<List<Guid>, List<IFormFile>>
    {
    }
}
