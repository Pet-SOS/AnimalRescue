using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using AnimalRescue.Contracts.BusinessLogic.Models.Document;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IOrganizationDocumentsService :
        IBlCreateAsync<UploadOrganizationDocumentModel>,
        IBlDeleteAsync,
        IBlCollectinQueryAsyncy<GetDocumentsOrganizationViewItem>
    {
    }
}
