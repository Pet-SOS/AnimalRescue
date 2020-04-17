using AnimalRescue.API.Core.Extensions;
using AnimalRescue.API.Models.Animals;
using AnimalRescue.API.Models.Blogs;
using AnimalRescue.API.Models.Blogs.Articles;
using AnimalRescue.API.Models.Blogs.Blogs;
using AnimalRescue.API.Models.Blogs.Stories;
using AnimalRescue.API.Models.Configurations.Contacts;
using AnimalRescue.API.Models.Configurations.Donations;
using AnimalRescue.API.Models.Employees;
using AnimalRescue.API.Models.FinancialReports;
using AnimalRescue.API.Models.Tags;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Donations;
using AnimalRescue.Contracts.BusinessLogic.Models.Tag;

using AutoMapper;

using System.Collections.Generic;
using System.Linq;

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

            CreateMap<FinancialReportModel, FinancialReportDto>();
            CreateMap<FinancialReportDto, FinancialReportModel>();
            CreateMap<FinancialReportCreateUpdateModel, FinancialReportModel>();


            CreateMap<AnimalCreateUpdateModel, AnimalModel>()
                .ForMember(x => x.Tags, opt => opt.MapFrom(m => StringSeparatedSemicolomnToList(m.Tags)))
                .ForMember(x=>x.Status, opt => opt.MapFrom(m=> MappingProfileExtensions.GetWellKnownTagModel(m.Status)))
                .ForMember(x=>x.LocationType, opt => opt.MapFrom(m=> MappingProfileExtensions.GetWellKnownTagModel(m.LocationType)))
                .ForMember(x=>x.LocationName, opt => opt.MapFrom(m=> MappingProfileExtensions.GetWellKnownTagModel(m.LocationName)));

            CreateMap<AnimalCreateUpdateModel, AnimalDto>()
                .ForMember(x => x.Tags, opt => opt.MapFrom(m => StringSeparatedSemicolomnToList(m.Tags)));

            CreateMap<TagModel, TagDto>();
            CreateMap<TagDto, TagModel>();
            CreateMap<TagCreateUpdateModel, TagModel>();
            CreateMap<TagCreateUpdateModel, TagDto>();

            CreateMap<LanguageValueModel, LanguageValueDto>();
            CreateMap<LanguageValueDto, LanguageValueModel>();
            CreateMap<WellKnownTagModel, WellKnownTagDto>();
            CreateMap<WellKnownTagDto, WellKnownTagModel>();
            CreateMap<WellKnownTagCreateUpdateModel, WellKnownTagDto>();
            CreateMap<WellKnownTagCreateUpdateModel, WellKnownTagDto>();

            CreateMap<EmployeeModel, EmployeeDto>();
            CreateMap<EmployeeDto, EmployeeModel>();
            CreateMap<EmployeeCreateUpdateModel, EmployeeModel>();
            CreateMap<EmployeeCreateUpdateModel, EmployeeDto>();

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
