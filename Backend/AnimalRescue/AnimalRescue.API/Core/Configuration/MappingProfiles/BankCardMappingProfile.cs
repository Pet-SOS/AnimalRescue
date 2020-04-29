using AnimalRescue.API.Models.Configurations.Donations;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Donations;
using AutoMapper;

namespace AnimalRescue.API.Core.Configuration.MappingProfiles
{
    public class BankCardMappingProfile : Profile
    {
        public BankCardMappingProfile()
        {
            CreateMap<BankCardModel, BankCardDto>();
            CreateMap<BankCardDto, BankCardModel>();
        }
    }
}
