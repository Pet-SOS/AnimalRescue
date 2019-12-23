using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.DataAccess.Mongodb.Models;

using AutoMapper;

namespace AnimalRescue.BusinessLogic.Configurations.MappingProfiles
{
    internal class AnimalMappingProfile : Profile
    {
        public AnimalMappingProfile()
        {
            CreateMap<Animal, AnimalDto>();
            CreateMap<AnimalDto, Animal>()
                .ForMember(x => x.ModifiedBy, options => options.Ignore())
                .ForMember(x => x.DateOfAdopted, options => options.Ignore())
                .ForMember(x => x.DateOfFound, options => options.Ignore());
        }
    }
}
