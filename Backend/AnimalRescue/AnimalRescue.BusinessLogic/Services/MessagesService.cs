using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.EventMessages;
using AnimalRescue.Contracts.BusinessLogic.Models.Messages;
using AnimalRescue.Contracts.BusinessLogic.Services;
using AnimalRescue.Infrastructure.Validation;

namespace AnimalRescue.BusinessLogic.Services
{
    public class MessagesService : IMessagesService
    {
        private readonly IEventEmittingService _eventEmittingService;
        public MessagesService(IEventEmittingService eventEmittingService)
        {
            Require.Objects.NotNull(eventEmittingService, nameof(eventEmittingService));

            _eventEmittingService = eventEmittingService;
        }
        public void SendMessage(string email, RequestAdoptAnimalDto requestAdoptAnimalDto)
        {
            var messageTitle = $"Хочу забрати тварину додому: {requestAdoptAnimalDto.AnimalName} (ID тварини: {requestAdoptAnimalDto.AnimalId})";
            var messageText = $"Ім'я: {requestAdoptAnimalDto.AdoptiveName}, Контактний номер телефону: {requestAdoptAnimalDto.PhoneNumber}";

            AdoptAnimalEmailMessage adoptAnimalEmailMessage = new AdoptAnimalEmailMessage();
            adoptAnimalEmailMessage.Title = messageTitle;
            adoptAnimalEmailMessage.Message = messageText;
            adoptAnimalEmailMessage.Address = email;

            _eventEmittingService.PublishMessage(adoptAnimalEmailMessage);
        }
    }
}
