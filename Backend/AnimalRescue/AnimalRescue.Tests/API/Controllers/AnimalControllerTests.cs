using AnimalRescue.API.Controllers;
using AnimalRescue.API.Core.Responses;
using AnimalRescue.API.Models.Animals;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Threading.Tasks;
using Xunit;

namespace AnimalRescue.Tests.API.Controllers
{
    public class AnimalControllerTests
    {
        private readonly Mock<IMapper> _mockMapper;
        private readonly Mock<IImageService> _mockImageService;
        private readonly Mock<ISequenceService> _mockSequenceService;
        private readonly Mock<IBlFullCrud<AnimalDto, AnimalDto, Guid>> _mockBlFullCrudService;
        private readonly Mock<IDocumentService> _mockDocumentService;

        private readonly AnimalsController _animalsController;

        public AnimalControllerTests()
        {
            _mockMapper = new Mock<IMapper>();
            _mockImageService = new Mock<IImageService>();
            _mockSequenceService = new Mock<ISequenceService>();
            _mockBlFullCrudService = new Mock<IBlFullCrud<AnimalDto, AnimalDto, Guid>>();
            _mockDocumentService = new Mock<IDocumentService>();

            _animalsController = new AnimalsController(_mockMapper.Object,
                _mockBlFullCrudService.Object,
                _mockImageService.Object,
                _mockDocumentService.Object,
                _mockSequenceService.Object)
            {
                ControllerContext = new ControllerContext { HttpContext = new DefaultHttpContext() }
            };

            _animalsController.HttpContext.Request.Scheme = "https";
        }

        #region Create

        [Fact()]
        public async Task CreateItemAsyncTest()
        {
            // Arrange
            var requestModel = new AnimalCreateUpdateModel();

            _mockMapper.Setup(x => x.Map<AnimalCreateUpdateModel, AnimalModel>(requestModel))
                .Returns(new AnimalModel());

            _mockMapper.Setup(x => x.Map<AnimalModel, AnimalDto>(It.IsAny<AnimalModel>()))
                .Returns(new AnimalDto());

            _mockMapper.Setup(x => x.Map<AnimalDto, AnimalModel>(It.IsAny<AnimalDto>()))
                .Returns(new AnimalModel { Id = Guid.NewGuid() });

            _mockBlFullCrudService.Setup(x => x.CreateAsync(It.IsAny<AnimalDto>()))
                .Returns(Task.FromResult(new AnimalDto()));

            _mockSequenceService.Setup(x => x.GetNextAsync())
                .Returns(Task.FromResult(new SequenceDto { Number = 12 }));

            //act
            var result = await _animalsController.CreateItemAsync(requestModel);

            //assert
            var responseResult = Assert.IsType<ActionResult<AnimalModel>>(result);
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(responseResult.Result);
            Assert.IsType<ContentApiResponse<AnimalModel>>(createdAtActionResult.Value);
        }

        [Fact()]
        public async Task CreateItem_WithAdoptionContract_Test()
        {
            // Arrange
            var mockAdoptionContractFile = new Mock<IFormFile>();

            _mockDocumentService.Setup(x => x.UploadFileAsync(mockAdoptionContractFile.Object))
                .ReturnsAsync(new Contracts.BusinessLogic.Models.Document.UploadDocumentModel { Id = Guid.NewGuid() });

            var requestModel = new AnimalCreateUpdateModel
            {
                AdoptionContractFile = mockAdoptionContractFile.Object
            };

            _mockMapper.Setup(x => x.Map<AnimalCreateUpdateModel, AnimalModel>(requestModel))
                .Returns(new AnimalModel { AdoptionContractFileId = Guid.NewGuid() });

            _mockMapper.Setup(x => x.Map<AnimalModel, AnimalDto>(It.IsAny<AnimalModel>()))
                .Returns(new AnimalDto { AdoptionContractFileId = Guid.NewGuid() });

            _mockMapper.Setup(x => x.Map<AnimalDto, AnimalModel>(It.IsAny<AnimalDto>()))
                .Returns(new AnimalModel { Id = Guid.NewGuid(), AdoptionContractFileId = Guid.NewGuid() });

            _mockBlFullCrudService.Setup(x => x.CreateAsync(It.IsAny<AnimalDto>()))
                .Returns(Task.FromResult(new AnimalDto()));

            _mockSequenceService.Setup(x => x.GetNextAsync())
                .Returns(Task.FromResult(new SequenceDto { Number = 12 }));

            //act
            var result = await _animalsController.CreateItemAsync(requestModel);

            //assert
            var responseResult = Assert.IsType<ActionResult<AnimalModel>>(result);
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(responseResult.Result);
            var model = Assert.IsType<ContentApiResponse<AnimalModel>>(createdAtActionResult.Value);
            var responseResultModel = Assert.IsType<AnimalModel>(model.Data);
            Assert.NotNull(responseResultModel.AdoptionContractFileId);
        }

        #endregion

        #region Update

        [Fact()]
        public async Task UpdateItemAsync_AnimalModelId_Equal_RequestId_Test()
        {
            // Arrange
            var requestModel = new AnimalCreateUpdateModel();
            var requesrAnimalModel = new AnimalModel();
            var id = Guid.NewGuid();

            _mockMapper.Setup(x => x.Map<AnimalCreateUpdateModel, AnimalModel>(requestModel))
                .Returns(requesrAnimalModel);

            _mockMapper.Setup(x => x.Map<AnimalModel, AnimalDto>(It.IsAny<AnimalModel>()))
                .Returns(new AnimalDto());

            _mockMapper.Setup(x => x.Map<AnimalDto, AnimalModel>(It.IsAny<AnimalDto>()))
                .Returns(new AnimalModel { Id = Guid.NewGuid() });

            _mockBlFullCrudService.Setup(x => x.CreateAsync(It.IsAny<AnimalDto>()))
                .Returns(Task.FromResult(new AnimalDto()));

            _mockSequenceService.Setup(x => x.GetNextAsync())
                .Returns(Task.FromResult(new SequenceDto { Number = 12 }));

            //act
            await _animalsController.UpdateAsync(id, requestModel);

            //assert
            Assert.Equal(id, requesrAnimalModel.Id);
        }

        [Fact()]
        public async Task UpdateItemAsync_AdoptionContractFileId_Equal_OldContractFileId_Test()
        {
            // Arrange
            var documentId = Guid.NewGuid();

            var requestModel = new AnimalCreateUpdateModel
            {
                AdoptionContractContractOldFileId = documentId
            };

            var requesrAnimalModel = new AnimalModel();

            _mockMapper.Setup(x => x.Map<AnimalCreateUpdateModel, AnimalModel>(requestModel))
                .Returns(requesrAnimalModel);

            _mockMapper.Setup(x => x.Map<AnimalModel, AnimalDto>(It.IsAny<AnimalModel>()))
                .Returns(new AnimalDto());

            _mockMapper.Setup(x => x.Map<AnimalDto, AnimalModel>(It.IsAny<AnimalDto>()))
                .Returns(new AnimalModel { Id = Guid.NewGuid() });

            _mockBlFullCrudService.Setup(x => x.CreateAsync(It.IsAny<AnimalDto>()))
                .Returns(Task.FromResult(new AnimalDto()));

            _mockSequenceService.Setup(x => x.GetNextAsync())
                .Returns(Task.FromResult(new SequenceDto { Number = 12 }));

            //act
            await _animalsController.UpdateAsync(Guid.NewGuid(), requestModel);

            //assert
            Assert.Equal(documentId, requesrAnimalModel.AdoptionContractFileId);
        }

        [Fact()]
        public async Task UpdateItemAsync_AdoptionContractFileId_Equal_NewFileId_Test()
        {
            // Arrange
            var mockAdoptionContractFile = new Mock<IFormFile>();
            var documentId = Guid.NewGuid();

            _mockDocumentService.Setup(x => x.UploadFileAsync(mockAdoptionContractFile.Object))
                .ReturnsAsync(new Contracts.BusinessLogic.Models.Document.UploadDocumentModel { Id = documentId });

            var requestModel = new AnimalCreateUpdateModel
            {
                AdoptionContractFile = mockAdoptionContractFile.Object
            };

            var requesrAnimalModel = new AnimalModel();

            _mockMapper.Setup(x => x.Map<AnimalCreateUpdateModel, AnimalModel>(requestModel))
                .Returns(requesrAnimalModel);

            _mockMapper.Setup(x => x.Map<AnimalModel, AnimalDto>(It.IsAny<AnimalModel>()))
                .Returns(new AnimalDto());

            _mockMapper.Setup(x => x.Map<AnimalDto, AnimalModel>(It.IsAny<AnimalDto>()))
                .Returns(new AnimalModel { Id = Guid.NewGuid() });

            _mockBlFullCrudService.Setup(x => x.CreateAsync(It.IsAny<AnimalDto>()))
                .Returns(Task.FromResult(new AnimalDto()));

            _mockSequenceService.Setup(x => x.GetNextAsync())
                .Returns(Task.FromResult(new SequenceDto { Number = 12 }));

            //act
            await _animalsController.UpdateAsync(Guid.NewGuid(), requestModel);

            //assert
            Assert.Equal(documentId, requesrAnimalModel.AdoptionContractFileId);
        }

        [Fact()]
        public async Task UpdateItemAsync_AdoptionContractFileId_Equal_Null_Test()
        {
            // Arrange
            var requestModel = new AnimalCreateUpdateModel();

            var requesrAnimalModel = new AnimalModel();

            _mockMapper.Setup(x => x.Map<AnimalCreateUpdateModel, AnimalModel>(requestModel))
                .Returns(requesrAnimalModel);

            _mockMapper.Setup(x => x.Map<AnimalModel, AnimalDto>(It.IsAny<AnimalModel>()))
                .Returns(new AnimalDto());

            _mockMapper.Setup(x => x.Map<AnimalDto, AnimalModel>(It.IsAny<AnimalDto>()))
                .Returns(new AnimalModel { Id = Guid.NewGuid() });

            _mockBlFullCrudService.Setup(x => x.CreateAsync(It.IsAny<AnimalDto>()))
                .Returns(Task.FromResult(new AnimalDto()));

            _mockSequenceService.Setup(x => x.GetNextAsync())
                .Returns(Task.FromResult(new SequenceDto { Number = 12 }));

            //act
            await _animalsController.UpdateAsync(Guid.NewGuid(), requestModel);

            //assert
            Assert.Null(requesrAnimalModel.AdoptionContractFileId);
        }

        #endregion
    }
}
