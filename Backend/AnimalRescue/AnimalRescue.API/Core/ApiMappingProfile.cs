using AnimalRescue.API.Models.Animals;
using AnimalRescue.API.Models.Blogs;
using AnimalRescue.API.Models.Blogs.Articles;
using AnimalRescue.API.Models.Blogs.Blogs;
using AnimalRescue.API.Models.Blogs.Stories;
using AnimalRescue.API.Models.Configurations.Contacts;
using AnimalRescue.API.Models.Configurations.Donations;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Donations;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using AnimalRescue.API.Models.Tags;

namespace AnimalRescue.API.Core
{
    public class ApiMappingProfile : Profile
	{
		public ApiMappingProfile()
        {
            CreateMap<BankCardModel, BankCardDto>();
            CreateMap<BankCardDto,BankCardModel>();
            CreateMap<DonationConfigurationModel, DonationConfigurationDto>();
            CreateMap<DonationConfigurationDto, DonationConfigurationModel>();

            CreateMap<CmsConfigurationModel, CmsConfigurationDto>();
            CreateMap<CmsConfigurationDto, CmsConfigurationModel>();

            CreateMap<AnimalModel, AnimalDto>();
            CreateMap<AnimalDto, AnimalModel>();

            CreateMap<AnimalCreateUpdateModel, AnimalModel>()
                .ForMember(x => x.Tags, opt => opt.MapFrom(m => StringSeparatedSemicolomnToList(m.Tags)));
            CreateMap<AnimalCreateUpdateModel, AnimalDto>()
                .ForMember(x => x.Tags, opt => opt.MapFrom(m => StringSeparatedSemicolomnToList(m.Tags)));

            CreateMap<TagModel, TagDto>();
            CreateMap<TagDto, TagModel>();
            CreateMap<TagCreateUpdateModel, TagModel>();
            CreateMap<TagCreateUpdateModel, TagDto>();

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
