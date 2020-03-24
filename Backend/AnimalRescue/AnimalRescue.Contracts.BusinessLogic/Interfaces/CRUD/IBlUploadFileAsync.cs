using AnimalRescue.Contracts.BusinessLogic.Models.Document;
using AnimalRescue.Contracts.Common.Interfaces.CRUD;

using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD
{
    public interface IBlUploadFileAsync :
        IBaseUploadFileAsync<List<UploadDocumentModel>, IEnumerable<IFormFile>>
    {
        Task<UploadDocumentModel> UploadFileAsync(IFormFile file);
    }
}
