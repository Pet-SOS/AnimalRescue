using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.DataAccess.Mongodb.Extensions;
using AnimalRescue.DataAccess.Mongodb.Models;

using AutoMapper;

namespace AnimalRescue.BusinessLogic.Configurations.MappingProfiles
{
    internal class SequenceMappingProfile : Profile
    {
        public SequenceMappingProfile()
        {
            CreateMap<Sequence, SequenceDto>()
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsGuid()));
            CreateMap<SequenceDto, Sequence>()
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsObjectIdString()));
        }
    }
}
