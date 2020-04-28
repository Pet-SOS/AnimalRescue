using AnimalRescue.API.Models.FinancialReports;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AutoMapper;

namespace AnimalRescue.API.Core.Configuration.MappingProfiles
{
    public class FinancialReportMappingProfile : Profile
    {
        public FinancialReportMappingProfile()
        {
            CreateMap<FinancialReportModel, FinancialReportDto>();
            CreateMap<FinancialReportDto, FinancialReportModel>();
            CreateMap<FinancialReportCreateUpdateModel, FinancialReportModel>();
        }
    }
}
