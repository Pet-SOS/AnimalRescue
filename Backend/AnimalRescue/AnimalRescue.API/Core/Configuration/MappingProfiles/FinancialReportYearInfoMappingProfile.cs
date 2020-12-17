using AnimalRescue.API.Models.FinancialReportYearInfo;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AutoMapper;

namespace AnimalRescue.API.Core.Configuration.MappingProfiles
{
    public class FinancialReportYearInfoMappingProfile : Profile
    {
        public FinancialReportYearInfoMappingProfile()
        {
            CreateMap<FinancialReportYearInfoModel, FinancialReportYearInfoDto>();
            CreateMap<FinancialReportYearInfoDto, FinancialReportYearInfoModel>();
        }
    }
}
