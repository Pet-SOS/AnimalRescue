using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IBlFullCrud<TOut, TIn> :
         IBlCollectinQueryAsyncy<TOut>,
         IBlOneItemQueryAsyncy<TOut>,
         IBlCreateAsync<TOut, TIn>,
         IBlUpdateAsync<TOut>,
         IBlDeleteAsync,
         IBlCountQueryAsync
    {
    }
}
