using AnimalRescue.Contracts.BusinessLogic.Models.EventMessages;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IEventEmittingService
    {
        void PublishMessage<TMessage>(TMessage message) 
            where TMessage : IEventMessage;
    }
}
