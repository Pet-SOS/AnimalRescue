using AnimalRescue.API.Models.Locations;
using AnimalRescue.API.Models.Tags;
using AnimalRescue.Contracts.BusinessLogic.Models.Tag;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AnimalRescue.API.Core.Extensions
{
    public static class MappingProfileExtensions
    {
        public static WellKnownTagModel GetWellKnownTagModel(string value)
            => value == null ? null : new WellKnownTagModel { Id = value };
        public static LocationModel GetLocationModel(Guid value)
            => value == null ? null : new LocationModel { Id = value };

        public static List<string> StringSeparatedSemicolomnToList(string value)
        {
            return value?
                .Split(",")
                .Select(x => x.Trim())
                .ToList() ?? new List<string>();
        }

        public static TagLargeDto CreateTagLargeDto(TagLargeModel tagLargeModel)
        {
            var newTagLargeDto = tagLargeModel == null ? null : new TagLargeDto
            {
                Category = tagLargeModel.Category,
                Code = tagLargeModel.Code
            };
            newTagLargeDto.Values = new System.Collections.Generic.List<LanguageValueDto>();
            newTagLargeDto.Values.AddRange(tagLargeModel.Values.Select(val => new LanguageValueDto { Lang = val.Lang, Value = val.Value }));
            return newTagLargeDto;
        }
    }
}
