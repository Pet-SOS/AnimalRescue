using AnimalRescue.Contracts.BusinessLogic.Interfaces;

namespace AnimalRescue.Contracts.BusinessLogic.Models
{
    public class BaseDto<TId> : IBaseDto<TId>
    {
        public TId Id { get; set; }
    }
}
