using System.Linq;
using System.Threading.Tasks;
using AnimalRescue.API.Models.Messages;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.Messages;
using AnimalRescue.Infrastructure.Configurations;
using AnimalRescue.Infrastructure.Validation;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace AnimalRescue.API.Controllers
{
    public class MessagesController : ApiControllerBase
    {
        private readonly IMapper _mapper;
        private readonly AppSettings _appSettings;
        private readonly IRequestAdoptAnimalService _requestAdoptAnimalService;

        public MessagesController(IMapper mapper,
            IOptions<AppSettings> appSettingsOptions,
            IRequestAdoptAnimalService requestAdoptAnimalService)
        {
            Require.Objects.NotNull(mapper, nameof(mapper));
            Require.Objects.NotNull(appSettingsOptions, nameof(appSettingsOptions));
            Require.Objects.NotNull(requestAdoptAnimalService, nameof(requestAdoptAnimalService));

            _mapper = mapper;
            _appSettings = appSettingsOptions.Value;
            _requestAdoptAnimalService = requestAdoptAnimalService;
        }

        [HttpPost("adoptAnimal")]
        [AllowAnonymous]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public void RequestAdoptAnimal([FromBody] RequestAdoptAnimalModel adoptAnimalModel)
        {
            var data = _mapper.Map<RequestAdoptAnimalModel, RequestAdoptAnimalDto>(adoptAnimalModel);

            _requestAdoptAnimalService.SendMessage(_appSettings.AnimalRescueEmail, data);
        }
    }
}
