using AnimalRescue.API.Models.Locations;
using AnimalRescue.API.Models.Tags;
using System;

namespace AnimalRescue.API.Core.Extensions
{
    public static class MappingProfileExtensions
    {
        public static WellKnownTagModel GetWellKnownTagModel(string value)
            => value == null ? null : new WellKnownTagModel { Id = value };
        public static LocationModel GetLocationModel(Guid value)
            => value == null ? null : new LocationModel { Id = value };
    }
}
