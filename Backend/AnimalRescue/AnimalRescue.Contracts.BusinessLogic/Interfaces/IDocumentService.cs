using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.BusinessLogic.Models.Document;
using AnimalRescue.Contracts.Common.Query;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IDocumentService :
        IBlOneItemQueryAsyncy<BucketItemDto>,
        IBlUploadFileAsync
    {
        Task<(List<GetOrganizationDocsDocumentViewItem>, int totalNumberOf)> GetOrganizationDocs(ApiQueryRequest queryRequest);
        Task SaveOrganizationDocument(Guid uploadedDocId, IFormFile files);
        Task RemoveOrganizationDocument(Guid id);
    }
}
