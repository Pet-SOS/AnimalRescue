using AnimalRescue.BusinessLogic.Interfaces.CRUD;
using AnimalRescue.BusinessLogic.Models;

namespace AnimalRescue.BusinessLogic.Interfaces
{
    public interface IAnimalService :
        IBlCollectinQueryAsyncy<AnimalDto>,
        IBlOneItemQueryAsyncy<AnimalDto>,
        IBlCreateAsync<AnimalDto>,    
        IBlUpdateAsync<AnimalDto>,
        IBlDeleteAsync 
    {
    }
}
