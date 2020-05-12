using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.DataAccess.Mongodb.Extensions;
using AnimalRescue.DataAccess.Mongodb.Models;

using AutoMapper;

namespace AnimalRescue.BusinessLogic.Configurations.MappingProfiles
{
    internal class RequestMappingProfile : Profile
    {
        public RequestMappingProfile()
        {
            CreateMap<Request, RequestDto>()
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsGuid()));
            CreateMap<RequestDto, Request>()
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsObjectIdString()));
        }
    }
}
