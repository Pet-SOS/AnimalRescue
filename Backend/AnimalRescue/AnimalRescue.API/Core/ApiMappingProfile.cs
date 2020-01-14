using AnimalRescue.API.Models;
using AnimalRescue.Contracts.BusinessLogic.Models;

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

            CreateMap<AnimalUpdateModel, AnimalModel>()
                .ForMember(x => x.Tags, opt => opt.MapFrom(m => StringSeparatedSemicolomnToList(m.Tags)));

            CreateMap<BlogModel, BlogDto>();
            CreateMap<BlogDto, BlogModel>();
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
