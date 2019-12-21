using System.Threading.Tasks;

namespace AnimalRescue.Contracts.Common.Interfaces.CRUD
{
    public interface IBaseUploadFileAsync<TOut, TIn>
    {
        Task<TOut> UploadFileAsync(TIn value);
    }
}
