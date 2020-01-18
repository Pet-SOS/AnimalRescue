using AnimalRescue.Contracts.Common.Interfaces.CRUD;
using AnimalRescue.Contracts.Common.Query;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD
{
    public interface IBlCountQueryAsync : IBaseCountQueryAsync<ApiQueryRequest>
    {
    }
}
