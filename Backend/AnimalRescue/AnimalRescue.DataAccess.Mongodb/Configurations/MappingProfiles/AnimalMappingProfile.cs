using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Models.DTO.Models;

using AutoMapper;

namespace AnimalRescue.DataAccess.Mongodb.Configurations.MappingProfiles
{
    class AnimalMappingProfile : Profile
    {
        public AnimalMappingProfile()
        {
            CreateMap<Animal, AnimalModel>();
            CreateMap<AnimalModel, Animal>()
                .ForMember(x => x.ModifiedBy, options => options.Ignore())
                .ForMember(x => x.DateOfAdopted, options => options.Ignore())
                .ForMember(x => x.DateOfFound, options => options.Ignore());  
        }
    }
}
