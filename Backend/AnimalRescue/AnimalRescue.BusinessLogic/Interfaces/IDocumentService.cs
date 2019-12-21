using AnimalRescue.BusinessLogic.Interfaces.CRUD;

namespace AnimalRescue.Contracts.Services
{
    public interface IDocumentService :
        IBlOneItemQueryAsyncy<byte[]>,
        IBlUploadFileAsync
    {
    }
}
