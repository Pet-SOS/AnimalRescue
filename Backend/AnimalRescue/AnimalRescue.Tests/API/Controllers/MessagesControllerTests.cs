using AnimalRescue.API.Controllers;
using AnimalRescue.API.Models.Messages;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.Messages;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Threading.Tasks;
using Xunit;
using System.Collections.Generic;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations;

namespace AnimalRescue.Tests.API.Controllers
{
    public class MessagesControllerTests
    {
        private readonly Mock<IMapper> _mockMapper;
        private readonly Mock<IConfigurationService> _mockConfigurationService;
        private readonly Mock<IRequestAdoptAnimalService> _mockRequestAdoptAnimalService;

        private readonly MessagesController _messagesController;

        public MessagesControllerTests()
        {
            _mockMapper = new Mock<IMapper>();
            _mockConfigurationService = new Mock<IConfigurationService>();
            _mockRequestAdoptAnimalService = new Mock<IRequestAdoptAnimalService>();

            _messagesController = new MessagesController(
                _mockConfigurationService.Object,
                _mockMapper.Object,
                _mockRequestAdoptAnimalService.Object);
        }

        [Fact()]
        public async Task RequestAdoptAnimalTest()
        {
            // arrange
            var requestModel = new RequestAdoptAnimalModel();
            var requestDto = new RequestAdoptAnimalDto();

            _mockMapper.Setup(x => x.Map<RequestAdoptAnimalModel, RequestAdoptAnimalDto>(requestModel))
                .Returns(requestDto);
            _mockConfigurationService.Setup(x => x.GetCmsConfigurationAsync())
                .Returns(Task.FromResult(new CmsConfigurationDto
                {
                    Emails = new Dictionary<string, string> { { "animalRescue1", "test@test" } }
                }));
            _mockRequestAdoptAnimalService
                .Setup(x => x.SendMessage(It.IsAny<string>(), It.IsAny<RequestAdoptAnimalDto>()))
                .Verifiable();

            // act
            await _messagesController.RequestAdoptAnimal(requestModel);

            // assert
            _mockRequestAdoptAnimalService.Verify(
                foo => foo.SendMessage("test@test", requestDto),
                Times.AtLeastOnce());
        }
    }
}
