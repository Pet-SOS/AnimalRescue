using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.BusinessLogic.Models.EventMessages;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class EmergencyRequestService : IEmergencyRequestService
    {
        private readonly IConfigurationRepository<EmergencyRequestMessage> _configurationRepository;
        private readonly IEventEmittingService _eventEmittingService;

        public EmergencyRequestService(
            IConfigurationRepository<EmergencyRequestMessage> configurationRepository,
            IEventEmittingService eventEmittingService)
        {
            _configurationRepository = configurationRepository;
            _eventEmittingService = eventEmittingService;
        }

        public async Task Notify(RequestDto request)
        {
            var messageFormatConfig = await _configurationRepository.GetConfigurationAsync();

            EmergencyMessage emergencyMessage = new EmergencyMessage();

            emergencyMessage.Message = string.Format(messageFormatConfig.Data.Body, request.Address, request.Phone, request.FirstName, request.LastName, request.KindOfAnimal.Id, request.AnimalState.Id, request.CaseDescription);

            _eventEmittingService.PublishMessage(emergencyMessage);
        }
    }
}
