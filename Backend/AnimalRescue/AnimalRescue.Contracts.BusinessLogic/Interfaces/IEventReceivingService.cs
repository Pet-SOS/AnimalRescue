using AnimalRescue.Contracts.BusinessLogic.Models.EventMessages;
using System;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IEventReceivingService
    {
        public void Run<TMessage>(Action<TMessage> action)
            where TMessage : IEventMessage;
    }
}
