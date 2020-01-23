using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.DataAccess.Mongodb.Models;
using AutoMapper;

namespace AnimalRescue.BusinessLogic.Configurations.MappingProfiles
{
    internal class FinancialReportMappingProfile: Profile
    {
        public FinancialReportMappingProfile()
        {
            CreateMap<FinancialReport, FinancialReportDto>();
            CreateMap<FinancialReportDto, FinancialReport>();
        }
    }
}
