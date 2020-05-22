using AnimalRescue.API.Models.History;
using AnimalRescue.Contracts.BusinessLogic.Models.History;
using AutoMapper;

namespace AnimalRescue.API.Core.Configuration.MappingProfiles
{
    public class HistoryProfile : Profile
    {
        public HistoryProfile()
        {
            CreateMap<DifferenceValueDto, DifferenceValueModel>();
            CreateMap<HistoryDto, HistoryModel>();
        }
    }
}
