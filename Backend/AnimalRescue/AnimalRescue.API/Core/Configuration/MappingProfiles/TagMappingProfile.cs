using AnimalRescue.API.Models.Tags;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AutoMapper;

namespace AnimalRescue.API.Core.Configuration.MappingProfiles
{
    public class TagMappingProfile : Profile
    {
        public TagMappingProfile()
        {
            CreateMap<TagModel, TagDto>();
            CreateMap<TagDto, TagModel>();
            CreateMap<TagCreateUpdateModel, TagModel>();
            CreateMap<TagCreateUpdateModel, TagDto>();
        }
    }
}
