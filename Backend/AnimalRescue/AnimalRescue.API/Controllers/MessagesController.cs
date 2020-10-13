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
        private readonly IRequestAdoptAnimalService _requestAdoptAnimalService;

        public MessagesController(IConfigurationService configurationService, 
            IMapper mapper, 
            IRequestAdoptAnimalService requestAdoptAnimalService)
        {
            Require.Objects.NotNull(mapper, nameof(mapper));
            Require.Objects.NotNull(configurationService, nameof(configurationService));
            Require.Objects.NotNull(requestAdoptAnimalService, nameof(requestAdoptAnimalService));

            _configurationService = configurationService;
            _mapper = mapper;
            _requestAdoptAnimalService = requestAdoptAnimalService;
        }

        [HttpPost("adoptAnimal")]
        [AllowAnonymous]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task RequestAdoptAnimal([FromBody] RequestAdoptAnimalModel adoptAnimalModel)
        {
            var data = _mapper.Map<RequestAdoptAnimalModel, RequestAdoptAnimalDto>(adoptAnimalModel);
            var homePopupDto = await _configurationService.GetHomePopupConfigurationAsync();           
            _requestAdoptAnimalService.SendMessage(homePopupDto.Email, data);
        }
    }
}