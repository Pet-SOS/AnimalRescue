using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Queries
{
    internal class TegDecorator<TOut, TIn> : IBlCreateAsync<TOut, TIn>
    {
        public async Task<TOut> CreateAsync(TIn value)
        {
            throw new System.NotImplementedException();
        }
    }
}
