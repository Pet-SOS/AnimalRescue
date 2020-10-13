using AnimalRescue.Contracts.BusinessLogic.Models.Messages;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
     public interface IRequestAdoptAnimalService
    {
        void SendMessage(string email, RequestAdoptAnimalDto requestAdoptAnimalDto);
    }
}
