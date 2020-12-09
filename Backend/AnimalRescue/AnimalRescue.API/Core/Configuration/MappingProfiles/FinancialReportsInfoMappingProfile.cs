using AnimalRescue.API.Models.Configurations.Info;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Info;
using AutoMapper;

namespace AnimalRescue.API.Core.Configuration.MappingProfiles
{
    public class FinancialReportsInfoMappingProfile : Profile
    {
        public FinancialReportsInfoMappingProfile()
        {
            CreateMap<FinancialReportsInfoModel, FinancialReportsInfoDto>();
            CreateMap<FinancialReportsInfoDto, FinancialReportsInfoModel>();
        }
    }
}
