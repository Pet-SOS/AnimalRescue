using AnimalRescue.API.Core.Extensions;
using AnimalRescue.API.Models.Blogs;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AutoMapper;

namespace AnimalRescue.API.Core.Configuration
{
    public abstract class ProfileMapper : Profile
    {
        protected void CreateMapFor<TCreate, TUpdate, TInfo, TDto>()
            where TCreate : BaseCreateModel
            where TUpdate : BaseUpdateModel
            where TInfo : BaseInfoModel
            where TDto : BaseCommonDto
        {
            CreateMap<TInfo, TDto>();
            CreateMap<TDto, TInfo>();
            CreateMap<TCreate, TInfo>()
                .ForMember(x => x.Tags, opt => opt.MapFrom(m => MappingProfileExtensions.StringSeparatedSemicolomnToList(m.Tags)));
            CreateMap<TUpdate, TInfo>()
                .ForMember(x => x.Tags, opt => opt.MapFrom(m => MappingProfileExtensions.StringSeparatedSemicolomnToList(m.Tags)));
            CreateMap<TUpdate, TDto>()
                .ForMember(x => x.Tags, opt => opt.MapFrom(m => MappingProfileExtensions.StringSeparatedSemicolomnToList(m.Tags)));
            CreateMap<TCreate, TDto>()
                .ForMember(x => x.Tags, opt => opt.MapFrom(m => MappingProfileExtensions.StringSeparatedSemicolomnToList(m.Tags)));
        }
    }
}
