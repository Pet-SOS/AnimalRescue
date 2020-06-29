using AnimalRescue.API.Models.Tags;
using AnimalRescue.Contracts.BusinessLogic.Models.Tag;
using AutoMapper;

namespace AnimalRescue.API.Core.Configuration.MappingProfiles
{
    public class TagLargeMappingProfile : Profile
    {
        public TagLargeMappingProfile()
        {
            CreateMap<TagLargeModel, TagLargeDto>();
            CreateMap<TagLargeDto, TagLargeModel>();
            CreateMap<TagLargeCreateUpdateModel, TagLargeModel>();
            CreateMap<TagLargeCreateUpdateModel, TagLargeDto>();
        }
    }
}
