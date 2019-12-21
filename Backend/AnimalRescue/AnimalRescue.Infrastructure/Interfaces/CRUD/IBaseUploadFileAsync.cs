using System.Threading.Tasks;

namespace AnimalRescue.Infrastructure.Interfaces.CRUD
{
    public interface IBaseUploadFileAsync<TOut, TIn>
    {
        Task<TOut> UploadFileAsync(TIn value);
    }
}
