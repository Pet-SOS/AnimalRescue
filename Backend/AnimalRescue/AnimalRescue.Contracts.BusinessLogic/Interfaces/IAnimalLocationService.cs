using AnimalRescue.Contracts.BusinessLogic.Models;

using System;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IAnimalLocationService :
        IBlFullCrud<AnimalLocationDto, AnimalLocationDto, Guid>
    {
    }
}
