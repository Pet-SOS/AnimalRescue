using AnimalRescue.Contracts.BusinessLogic.Models.History;
using AnimalRescue.DataAccess.Mongodb.Extensions;
using AnimalRescue.DataAccess.Mongodb.Models.History;
using AutoMapper;

namespace AnimalRescue.BusinessLogic.Configurations.MappingProfiles
{
    internal class HistoryProfile : Profile
    {
        public HistoryProfile()
        {
            CreateMap<DifferenceValue, DifferenceValueDto>();
            CreateMap<DifferenceValueDto, DifferenceValue>();
            CreateMap<History, HistoryDto>().ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsGuid()));
            CreateMap<HistoryDto, History>().ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsObjectIdString()));
        }
    }
}
