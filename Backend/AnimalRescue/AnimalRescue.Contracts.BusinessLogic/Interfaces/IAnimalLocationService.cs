using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using AnimalRescue.Contracts.BusinessLogic.Models;
using System.Collections.Generic;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IAnimalLocationService :
        IBlFullCrud<AnimalLocationDto, AnimalLocationDto>
    {
    }
}
