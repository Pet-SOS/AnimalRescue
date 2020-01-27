using AnimalRescue.Contracts.Common.Interfaces.CRUD;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD
{
    public interface IBlCreateAsync<TOut, TIn> : IBaseCreateAsync<TOut, TIn>
    {
    }
    public interface IBlCreateAsync<TIn> : IBaseVoidCreateAsync<TIn>
    {
    }
    public interface IBlCreateIfNotExistAsync<TIn> : IBaseVoidCreateIfNotExistAsync<TIn>
    {
    }
}
