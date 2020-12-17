using AnimalRescue.API.Controllers;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AutoMapper;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace AnimalRescue.Tests.API.Controllers
{
    public class AnimalControllerTests
    {
        [Fact()]
        public void CreateItemAsyncTest()
        {
            var mockMapper = new Mock<IMapper>();
            var mockImageService = new Mock<IImageService>();
            var mockSequenceService = new Mock<ISequenceService>();
            var mockBlFullCrudService = new Mock<IBlFullCrud<AnimalDto, AnimalDto, Guid>>();

            var controller = new AnimalsController(mockMapper.Object, mockBlFullCrudService.Object, mockImageService.Object, mockSequenceService.Object);



            Assert.True(false, "This test needs an implementation");
        }
    }
}
