using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.DataAccess.Mongodb.Extensions;
using AnimalRescue.DataAccess.Mongodb.Models;
using AutoMapper;

namespace AnimalRescue.BusinessLogic.Configurations.MappingProfiles
{
    internal class FinancialReportYearInfoMappingProfile : Profile
    {
        public FinancialReportYearInfoMappingProfile()
        {
            CreateMap<FinancialReportYearInfo, FinancialReportYearInfoDto>()
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsGuid()));
            CreateMap<FinancialReportYearInfoDto, FinancialReportYearInfo>()
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsObjectIdString()));
        }
    }
}
