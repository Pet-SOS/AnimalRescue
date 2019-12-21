using AnimalRescue.Infrastructure.Interfaces.CRUD;

using Microsoft.AspNetCore.Http;

using System.Collections.Generic;

namespace AnimalRescue.BusinessLogic.Interfaces.CRUD
{
    public interface IBlUploadFileAsync :
        IBaseUploadFileAsync<List<string>, List<IFormFile>>
    {
    }
}
