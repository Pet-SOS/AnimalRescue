using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IBlFullCrud<TOut, TIn, TId> :
         IBlCollectinQueryAsync<TOut>,
         IBlOneItemQueryAsync<TOut, TId>,
         IBlCreateAsync<TOut, TIn>,
         IBlUpdateAsync<TOut>,
         IBlDeleteAsync<TId>,
         IBlCountQueryAsync
    {
    }
}
