namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IBaseDto<TId>
    {
        public TId Id { get; set; }
    }
}
