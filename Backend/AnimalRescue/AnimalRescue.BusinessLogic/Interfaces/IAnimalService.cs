using AnimalRescue.BusinessLogic.Models;
using AnimalRescue.Infrastructure.Interfaces.CRUD;
using AnimalRescue.Infrastructure.Query;

using System.Collections.Generic;

namespace AnimalRescue.BusinessLogic.Interfaces
{
    public interface IAnimalService : 
        IBaseQuery<(List<AnimalDto> collection, int totalCount), ApiQueryRequest>,
        IBaseQuery<AnimalDto, string>, 
        IBaseCreate<AnimalDto>,    
        IBaseUpdate<AnimalDto>,
        IBaseDelete<string> 
    {
    }
}
