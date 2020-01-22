using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.DataAccess.Mongodb.Models;
using AutoMapper;

namespace AnimalRescue.BusinessLogic.Configurations.MappingProfiles
{
    internal class TagMappingProfile : Profile
    {
        public TagMappingProfile()
        {
            CreateMap<Tags, TagDto>();
            CreateMap<TagDto, Tags>();
        }
    }
}
