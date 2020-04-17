using AnimalRescue.API.Models.Tags;

namespace AnimalRescue.API.Core.Extensions
{
    public static class MappingProfileExtensions
    {
        public static WellKnownTagModel GetWellKnownTagModel(string value)
            => value == null ? null : new WellKnownTagModel { Id = value };
    }
}
