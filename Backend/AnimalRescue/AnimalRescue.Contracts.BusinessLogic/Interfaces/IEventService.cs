using System;
using System.Collections.Generic;
using System.Text;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IEventService
    {
        void PublishMessage(string message);
    }
}
