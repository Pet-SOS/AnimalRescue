using AnimalRescue.API.Models;
using AnimalRescue.API.Models.Animals;
using AnimalRescue.API.Models.Blogs;
using AnimalRescue.API.Models.Blogs.Articles;
using AnimalRescue.API.Models.Blogs.Blogs;
using AnimalRescue.API.Models.Blogs.Stories;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;

using AutoMapper;

using System.Collections.Generic;
using System.Linq;

namespace AnimalRescue.API.Core
{
    public class ApiMappingProfile : Profile
	{
		public ApiMappingProfile()
        {
            CreateMap<CmsConfigurationModel, CmsConfigurationDto>();
            CreateMap<CmsConfigurationDto, CmsConfigurationModel>();

            CreateMap<AnimalModel, AnimalDto>();
            CreateMap<AnimalDto, AnimalModel>();

            CreateMap<AnimalCreateModel, AnimalModel>()
                .ForMember(x => x.Tags, opt => opt.MapFrom(m => StringSeparatedSemicolomnToList(m.Tags)));
            CreateMap<AnimalCreateModel, AnimalDto>()
                .ForMember(x => x.Tags, opt => opt.MapFrom(m => StringSeparatedSemicolomnToList(m.Tags)));

            CreateMap<AnimalUpdateModel, AnimalModel>()
                .ForMember(x => x.Tags, opt => opt.MapFrom(m => StringSeparatedSemicolomnToList(m.Tags)));

            BlogConfigs(); 
        }

        private void BlogConfigs()
        {
            CreateMapFor<BlogCreateModel, BlogUpdateModel, BlogInfoModel, BlogDto>();
            CreateMapFor<StoryCreateModel, StoryUpdateModel, StoryInfoModel, StoryDto>();
            CreateMapFor<ArticleCreateModel, ArticleUpdateModel, ArticleInfoModel, ArticleDto>();
        }

        private void CreateMapFor<TCreate, TUpdate, TInfo, TDto>()
            where TCreate : BaseCreateModel
            where TUpdate : BaseUpdateModel
            where TInfo : BaseInfoModel
            where TDto : BaseCommonDto 
        {
            CreateMap<TInfo, TDto>();
            CreateMap<TDto, TInfo>();
            CreateMap<TCreate, TInfo>()
                .ForMember(x => x.Tags, opt => opt.MapFrom(m => StringSeparatedSemicolomnToList(m.Tags)));
            CreateMap<TUpdate, TInfo>()
                .ForMember(x => x.Tags, opt => opt.MapFrom(m => StringSeparatedSemicolomnToList(m.Tags)));
            CreateMap<TUpdate, TDto>()
                .ForMember(x => x.Tags, opt => opt.MapFrom(m => StringSeparatedSemicolomnToList(m.Tags)));
            CreateMap<TCreate, TDto>()
                .ForMember(x => x.Tags, opt => opt.MapFrom(m => StringSeparatedSemicolomnToList(m.Tags)));
        }

        private static List<string> StringSeparatedSemicolomnToList(string value)
        {
            return value?
                .Split(",")
                .Select(x => x.Trim())
                .ToList() ?? new List<string>();
        }
    }
}
