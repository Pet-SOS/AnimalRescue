using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using AnimalRescue.Contracts.BusinessLogic.Models.Document;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IOrganizationDocumentsService :
        IBlCreateAsync<UploadOrganizationDocumentModel>,
        IBlDeleteAsync,
        IBlCollectinQueryAsyncy<GetDocumentsOrganizationViewItem>
    {
        Task<UploadOrganizationDocumentModel> UploadFileAsync((IFormFile, string) data);
    }
}
