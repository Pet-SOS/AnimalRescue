using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using AnimalRescue.Contracts.BusinessLogic.Models.Document;

using System;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IOrganizationDocumentService :
        IBlDeleteAsync<Guid>,
        IBlCollectinQueryAsync<GetDocumentsOrganizationViewItem>
    {
        Task<GetDocumentsOrganizationViewItem> CreateAsync(UploadDocumentModel model, Guid userId);
    }
}
