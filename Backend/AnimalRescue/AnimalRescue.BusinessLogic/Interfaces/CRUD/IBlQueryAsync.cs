using AnimalRescue.BusinessLogic.Models;
using AnimalRescue.Infrastructure.Interfaces.CRUD;
using AnimalRescue.Infrastructure.Query;

namespace AnimalRescue.BusinessLogic.Interfaces.CRUD
{
    public interface IBlCollectinQueryAsyncy<TOut> : IBaseQuerAsyncy<BlCollectonResponse<TOut>, ApiQueryRequest>
    {
    }
    public interface IBlOneItemQueryAsyncy<TOut>  : IBaseQuerAsyncy<TOut, string>
    {
    }
}
