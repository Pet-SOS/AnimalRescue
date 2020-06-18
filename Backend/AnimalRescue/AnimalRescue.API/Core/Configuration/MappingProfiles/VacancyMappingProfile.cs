using AnimalRescue.API.Models.Vacancies;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AutoMapper;

namespace AnimalRescue.API.Core.Configuration.MappingProfiles
{
    public class VacancyMappingProfile : Profile
    {
        public VacancyMappingProfile()
        {
            CreateMap<VacancyModel, VacancyDto>();
            CreateMap<VacancyDto, VacancyModel>();
            CreateMap<VacancyCreateUpdateModel, VacancyModel>();
            CreateMap<VacancyCreateUpdateModel, VacancyDto>();
        }
    }
}
