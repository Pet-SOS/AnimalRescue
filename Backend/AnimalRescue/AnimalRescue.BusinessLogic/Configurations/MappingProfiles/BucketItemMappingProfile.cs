using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.DataAccess.Mongodb.Models;
using AutoMapper;

namespace AnimalRescue.BusinessLogic.Configurations.MappingProfiles
{
    internal class BucketItemMappingProfile : Profile
    {
        public BucketItemMappingProfile()
        {
            CreateMap<BucketItem, BucketItemDto>();
        }
    }
}
