using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IDocumentService :
        IBlOneItemQueryAsyncy<byte[]>,
        IBlUploadFileAsync
    {
    }
}
