namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IEventEmittingService
    {
        void PublishMessage(string message);
        void PublishMessage<TMessage>(TMessage message);
    }
}
