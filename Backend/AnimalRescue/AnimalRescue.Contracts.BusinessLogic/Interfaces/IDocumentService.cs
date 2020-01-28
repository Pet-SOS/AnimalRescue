using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using AnimalRescue.DataAccess.Mongodb.Models;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IDocumentService :
        IBlOneItemQueryAsyncy<BucketItem>,
        IBlUploadFileAsync
    {
    }
}
