using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.DataAccess.Mongodb.Extensions;
using AnimalRescue.DataAccess.Mongodb.Models;
using AutoMapper;
using System.Linq;

namespace AnimalRescue.BusinessLogic.Configurations.MappingProfiles
{
    internal class AnimalLocationMappingProfile : Profile
    {
        public AnimalLocationMappingProfile()
        {
            CreateMap<AnimalLocation, AnimalLocationDto>()
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsGuid()));
            CreateMap<AnimalLocationDto, AnimalLocation>()
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsObjectIdString()));
        }
    }
}
