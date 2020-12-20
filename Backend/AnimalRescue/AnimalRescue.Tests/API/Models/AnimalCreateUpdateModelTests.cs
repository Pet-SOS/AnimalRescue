using AnimalRescue.API.Models.Animals;
using Microsoft.AspNetCore.Http;
using Moq;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using Xunit;

namespace AnimalRescue.Tests.API.Models
{
    public class AnimalCreateUpdateModelTests
    {
        [Fact()]
        public void AnimalCreateUpdateModel_Adopted_ValidData_Test()
        {
            // Arrange
            var model = new AnimalCreateUpdateModel
            {
                Status = "Adopted",
                AdoptiveName = "Test Name",
                AdoptivePhone = "1234567890"
            };

            var context = new ValidationContext(model);

            //act
            var result = model.Validate(context);

            //assert
            Assert.Empty(result);
        }

        [Fact()]
        public void AnimalCreateUpdateModel_InvalidAdoptivePhoneNumberFormat_Test()
        {
            // Arrange
            var model = new AnimalCreateUpdateModel
            {
                Status = "Adopted",
                AdoptiveName = "Test Name",
                AdoptivePhone = "12_3qw4567890"
            };

            var context = new ValidationContext(model);
            var result = new List<ValidationResult>();

            //act
            Validator.TryValidateObject(model, context, result, true);

            //assert
            var error = result.FirstOrDefault();
            var memberName = error?.MemberNames?.FirstOrDefault(x => x == nameof(model.AdoptivePhone));
            Assert.Equal(nameof(model.AdoptivePhone), memberName);
        }

        [Fact()]
        public void AnimalCreateUpdateModel_Adopted_EmptyAdoptiveName_Test()
        {
            // Arrange
            var model = new AnimalCreateUpdateModel
            {
                Status = "Adopted",
                AdoptiveName = "",
                AdoptivePhone = "1234567890"
            };

            var context = new ValidationContext(model);

            //act
            var result = model.Validate(context);

            //assert
            var error = result.FirstOrDefault();
            var memberName = error?.MemberNames?.FirstOrDefault(x => x == nameof(model.AdoptiveName));
            Assert.Equal(nameof(model.AdoptiveName), memberName);
        }

        [Fact()]
        public void AnimalCreateUpdateModel_Adopted_EmptyAdoptivePhoneNumber_Test()
        {
            // Arrange
            var model = new AnimalCreateUpdateModel
            {
                Status = "Adopted",
                AdoptiveName = "Test Name",
                AdoptivePhone = ""
            };

            var context = new ValidationContext(model);

            //act
            var result = model.Validate(context);

            //assert
            var error = result.FirstOrDefault();
            var memberName = error?.MemberNames?.FirstOrDefault(x => x == nameof(model.AdoptivePhone));
            Assert.Equal(nameof(model.AdoptivePhone), memberName);
        }

        [Fact()]
        public void AnimalCreateUpdateModel_NotAdopted_ValidData_Test()
        {
            // Arrange
            var model = new AnimalCreateUpdateModel
            {
                Status = "New",
                AdoptiveName = "",
                AdoptivePhone = "",
                AdoptionContractFile = null,
                AdoptionContractContractOldFileId = null
            };

            var context = new ValidationContext(model);

            //act
            var result = model.Validate(context);

            //assert
            Assert.Empty(result);
        }

        [Fact()]
        public void AnimalCreateUpdateModel_NotAdopted_NotEmptyAdoptiveName_Test()
        {
            // Arrange
            var model = new AnimalCreateUpdateModel
            {
                Status = "New",
                AdoptiveName = "Test Name",
                AdoptivePhone = ""
            };

            var context = new ValidationContext(model);

            //act
            var result = model.Validate(context);

            //assert
            var error = result.FirstOrDefault();
            var memberName = error?.MemberNames?.FirstOrDefault(x => x == nameof(model.AdoptiveName));
            Assert.Equal(nameof(model.AdoptiveName), memberName);
        }

        [Fact()]
        public void AnimalCreateUpdateModel_NotAdopted_NotEmptyAdoptivePhoneNumber_Test()
        {
            // Arrange
            var model = new AnimalCreateUpdateModel
            {
                Status = "New",
                AdoptiveName = "",
                AdoptivePhone = "0123456789"
            };

            var context = new ValidationContext(model);

            //act
            var result = model.Validate(context);

            //assert
            var error = result.FirstOrDefault();
            var memberName = error?.MemberNames?.FirstOrDefault(x => x == nameof(model.AdoptivePhone));
            Assert.Equal(nameof(model.AdoptivePhone), memberName);
        }

        [Fact()]
        public void AnimalCreateUpdateModel_NotAdopted_NotEmptyAdoptionContractFile_Test()
        {
            var mockAdoptionContractFile = new Mock<IFormFile>();

            // Arrange
            var model = new AnimalCreateUpdateModel
            {
                Status = "New",
                AdoptiveName = "",
                AdoptivePhone = "",
                AdoptionContractFile = mockAdoptionContractFile.Object
            };

            var context = new ValidationContext(model);

            //act
            var result = model.Validate(context);

            //assert
            var error = result.FirstOrDefault();
            var memberName = error?.MemberNames?.FirstOrDefault(x => x == nameof(model.AdoptionContractFile));
            Assert.Equal(nameof(model.AdoptionContractFile), memberName);
        }
    }
}
