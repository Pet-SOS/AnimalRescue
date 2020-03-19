using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.BusinessLogic.Models.Document;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IDocumentService :
        IBlOneItemQueryAsyncy<BucketItemDto>,
        IBlUploadFileAsync,
        IBlCreateAsync<UploadOrganizationDocumentModel>,
        IBlDeleteAsync,
        IBlCollectinQueryAsyncy<GetOrganizationDocsDocumentViewItem>
    {
    }
}
