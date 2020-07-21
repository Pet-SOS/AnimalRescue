using AnimalRescue.API.Models.Locations;
using AnimalRescue.API.Models.Tags;

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
    }
}
