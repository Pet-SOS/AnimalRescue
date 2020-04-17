namespace AnimalRescue.Contracts.BusinessLogic.Models
{
    public interface IBaseDto<TId>
    {
        public TId Id { get; set; }
    }
    public class BaseDto<TId> : IBaseDto<TId>
    {
        public TId Id { get; set; }
    }
}
