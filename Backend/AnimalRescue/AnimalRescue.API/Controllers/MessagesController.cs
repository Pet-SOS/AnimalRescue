using System;
using System.Threading.Tasks;
using AnimalRescue.API.Models.Messages;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.Messages;
using AnimalRescue.Infrastructure.Validation;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AnimalRescue.API.Controllers
{
    public class MessagesController : ApiControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IConfigurationService _configurationService;
        private readonly IMessagesService _messagesService;
        private readonly IBlFullCrud<RequestAdoptAnimalDto, RequestAdoptAnimalDto, Guid> _requesAdoptAnimalService;

        public MessagesController(IConfigurationService configurationService, 
            IMapper mapper, 
            IMessagesService messagesService, 
            IBlFullCrud<RequestAdoptAnimalDto, RequestAdoptAnimalDto, Guid> requestAdoptAnimalService)
        {
            Require.Objects.NotNull(mapper, nameof(mapper));
            Require.Objects.NotNull(configurationService, nameof(configurationService));
            Require.Objects.NotNull(messagesService, nameof(messagesService));
            Require.Objects.NotNull(requestAdoptAnimalService, nameof(requestAdoptAnimalService));

            _configurationService = configurationService;
            _mapper = mapper;
            _messagesService = messagesService;
            _requesAdoptAnimalService = requestAdoptAnimalService;
        }

        [HttpPost("adoptAnimal")]
        [AllowAnonymous]
        public async Task RequestAdoptAnimal([FromBody] RequestAdoptAnimalModel adoptAnimalModel)
        {
            var data = _mapper.Map<RequestAdoptAnimalModel, RequestAdoptAnimalDto>(adoptAnimalModel);
            var homePopupDto = await _configurationService.GetHomePopupConfigurationAsync();
            await _requesAdoptAnimalService.CreateAsync(data);
            _messagesService.SendMessage(homePopupDto.Email, data);
        }
    }
}