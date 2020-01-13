using AnimalRescue.Contracts.Common.Interfaces.CRUD;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD
{
    public interface IBlCreateAsync<TIn> : IBaseCreateAsync<TIn, TIn>
    {
    }

	public interface IBlCreateAsync<TOut, TIn> : IBaseCreateAsync<TOut, TIn>
	{
	}
}
