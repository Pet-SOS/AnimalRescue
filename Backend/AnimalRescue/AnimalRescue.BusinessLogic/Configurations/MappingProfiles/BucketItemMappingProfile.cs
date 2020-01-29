using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.DataAccess.Mongodb.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Models;

using AutoMapper;

namespace AnimalRescue.BusinessLogic.Configurations.MappingProfiles
{
    internal class BucketItemMappingProfile : Profile
    {
        public BucketItemMappingProfile()
        {
            CreateMap<BucketItem, BucketItemDto>()
                .ForMember(x => x.Data, o => o.MapFrom(x => x.Data))
                .ForMember(x => x.ContentType, o => o.MapFrom(x => x.ContentType));

            CreateMap<BucketItemDto, BucketItem>()
                .ForMember(x => x.Data, o => o.MapFrom(x => x.Data))
                .ForMember(x => x.ContentType, o => o.MapFrom(x => x.ContentType));
        }
    }
}
