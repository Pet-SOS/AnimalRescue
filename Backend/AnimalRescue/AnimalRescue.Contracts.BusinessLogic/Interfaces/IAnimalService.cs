using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using AnimalRescue.Contracts.BusinessLogic.Models;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IAnimalService :
        IBlCollectinQueryAsyncy<AnimalDto>,
        IBlOneItemQueryAsyncy<AnimalDto>,
        IBlCreateAsync<AnimalDto, AnimalDto>,
        IBlUpdateAsync<AnimalDto>,
        IBlDeleteAsync
    {
    }
}
