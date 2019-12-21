using AnimalRescue.Infrastructure.Interfaces.CRUD;

namespace AnimalRescue.BusinessLogic.Interfaces.CRUD
{
    public interface IBlCreateAsync<TIn> : IBaseCreateAsync<TIn, TIn>
    {
    }
}
