using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using animal = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Animal;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.API.Models.Animals
{
    public class AnimalCreateUpdateModel : IValidatableObject
    {
        [JsonPropertyName(animal.Number)]
        [JsonProperty(animal.Number)]
        public int Number { get; set; }

        [JsonPropertyName(common.Name)]
        [JsonProperty(common.Name)]
        public string Name { get; set; }

        [JsonPropertyName(animal.KindOfAnimal)]
        [JsonProperty(animal.KindOfAnimal)]
        public string KindOfAnimal { get; set; }

        [JsonPropertyName(animal.Gender)]
        [JsonProperty(animal.Gender)]
        public string Gender { get; set; }

        [JsonPropertyName(common.Description)]
        [JsonProperty(common.Description)]
        public string Description { get; set; }

        [JsonPropertyName(common.Images)]
        [JsonProperty(common.Images)]
        public List<IFormFile> Images { get; set; } = new List<IFormFile>();

        [JsonPropertyName(common.ImageIds)]
        [JsonProperty(common.ImageIds)]
        public string PreviousImageIds { get; set; }

        [JsonPropertyName(common.Tags)]
        [JsonProperty(common.Tags)]
        public string Tags { get; set; }

        [JsonPropertyName(animal.CoverImage)]
        [JsonProperty(animal.CoverImage)]
        public int CoverImage { get; set; }

        [JsonPropertyName(animal.Birthday)]
        [JsonProperty(animal.Birthday)]
        public DateTime Birthday { get; set; }

        [JsonPropertyName(animal.Character)]
        [JsonProperty(animal.Character)]
        public string Character { get; set; }

        [JsonPropertyName(animal.Status)]
        [JsonProperty(animal.Status)]
        public string Status { get; set; }

        [Required]
        [JsonPropertyName(animal.LocationTypeId)]
        [JsonProperty(animal.LocationTypeId)]
        public Guid LocationTypeId { get; set; }

        [JsonPropertyName(animal.LocationName)]
        [JsonProperty(animal.LocationName)]
        public string LocationName { get; set; }

        [JsonPropertyName(animal.IsDonationActive)]
        [JsonProperty(animal.IsDonationActive)]
        public bool IsDonationActive { get; set; }

        [JsonPropertyName(animal.BannerText)]
        [JsonProperty(animal.BannerText)]
        public string BannerText { get; set; }

        [JsonPropertyName(animal.AdoptiveName)]
        [JsonProperty(animal.AdoptiveName)]
        public string AdoptiveName { get; set; }

        [RegularExpression(@"^[0-9\-\+]{4,15}$", ErrorMessage = "Incorrect phone number format.")]
        [JsonPropertyName(animal.AdoptivePhone)]
        [JsonProperty(animal.AdoptivePhone)]
        public string AdoptivePhone { get; set; }

        [JsonPropertyName(animal.AdoptionContractFile)]
        [JsonProperty(animal.AdoptionContractFile)]
        public IFormFile AdoptionContractFile { get; set; }

        [JsonPropertyName(animal.AdoptionContractContractOldFileId)]
        [JsonProperty(animal.AdoptionContractContractOldFileId)]
        public Guid? AdoptionContractContractOldFileId { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var errors = new List<ValidationResult>();

            if (string.Equals(Status, "ADOPTED", StringComparison.OrdinalIgnoreCase))
            {
                if (string.IsNullOrWhiteSpace(AdoptiveName))
                {
                    errors.Add(new ValidationResult($"{nameof(AdoptiveName)} is required", new[] { nameof(AdoptiveName) }));
                }

                if (string.IsNullOrWhiteSpace(AdoptivePhone))
                {
                    errors.Add(new ValidationResult($"{nameof(AdoptivePhone)} is required", new[] { nameof(AdoptivePhone) }));
                }
            }
            else
            {
                if (!string.IsNullOrWhiteSpace(AdoptiveName))
                {
                    errors.Add(new ValidationResult($"{nameof(AdoptiveName)} must be empty", new[] { nameof(AdoptiveName) }));
                }

                if (!string.IsNullOrWhiteSpace(AdoptivePhone))
                {
                    errors.Add(new ValidationResult($"{nameof(AdoptivePhone)} must be empty", new[] { nameof(AdoptivePhone) }));
                }

                if (AdoptionContractFile != null)
                {
                    errors.Add(new ValidationResult($"{nameof(AdoptionContractFile)} must be empty", new[] { nameof(AdoptionContractFile) }));
                }
            }

            return errors;
        }
    }
}
