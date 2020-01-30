using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using AnimalRescue.Contracts.BusinessLogic.Models;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IDocumentService :
        IBlOneItemQueryAsyncy<BucketItemDto>,
        IBlUploadFileAsync
    {
    }
}
