using AnimalRescue.Contracts.BusinessLogic.Models;

using System;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface ILocationService :
        IBlFullCrud<LocationDto, LocationDto, Guid>
    {
    }
}
