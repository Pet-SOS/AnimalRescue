using AnimalRescue.API.Models.History;
using AnimalRescue.Contracts.BusinessLogic.Models.History;
using AutoMapper;

namespace AnimalRescue.API.Core.Configuration.MappingProfiles
{
    public class HistoryProfile : Profile
    {
        public HistoryProfile()
        {
            CreateMap<PropertyValueModel, PropertyValueDto>();
            CreateMap<PropertyValueDto, PropertyValueModel>();
            CreateMap<HistoryModel, HistoryDto>();
            CreateMap<HistoryDto, HistoryModel>();
        }
    }
}
