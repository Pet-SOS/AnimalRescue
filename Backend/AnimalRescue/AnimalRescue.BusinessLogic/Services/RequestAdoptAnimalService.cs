using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.EventMessages;
using AnimalRescue.Contracts.BusinessLogic.Models.Messages;
using AnimalRescue.Infrastructure.Validation;
using System.Globalization;

namespace AnimalRescue.BusinessLogic.Services
{
    public class RequestAdoptAnimalService : IRequestAdoptAnimalService
    {
        private const string MessageTitle = @"Хочу забрати тварину додому: {0} (ID тварини: {1})";
        private const string MessageText = @"Ім'я: {0}, Контактний номер телефону: {1}";

        private readonly IEventEmittingService _eventEmittingService;
        public RequestAdoptAnimalService(IEventEmittingService eventEmittingService)
        {
            Require.Objects.NotNull(eventEmittingService, nameof(eventEmittingService));

            _eventEmittingService = eventEmittingService;
        }
        public void SendMessage(string email, RequestAdoptAnimalDto requestAdoptAnimalDto)
        {
            AdoptAnimalEmailMessage adoptAnimalEmailMessage = new AdoptAnimalEmailMessage();
            adoptAnimalEmailMessage.Title = string.Format(CultureInfo.CurrentCulture, MessageTitle, requestAdoptAnimalDto.AnimalName, requestAdoptAnimalDto.AnimalId);
            adoptAnimalEmailMessage.Message = string.Format(CultureInfo.CurrentCulture, MessageText, requestAdoptAnimalDto.AdoptiveName, requestAdoptAnimalDto.PhoneNumber);
            adoptAnimalEmailMessage.Address = email;

            _eventEmittingService.PublishMessage(adoptAnimalEmailMessage);
        }
    }
}
