using AnimalRescue.Contracts.BusinessLogic.Models.Account;
using AnimalRescue.Contracts.BusinessLogic.Models.UsersManagement;
using AnimalRescue.DataAccess.Mongodb.Models;
using AutoMapper;

namespace AnimalRescue.BusinessLogic.Configurations.MappingProfiles
{
    class ApplicationUserMappingProfile : Profile
    {
        public ApplicationUserMappingProfile()
        {
            CreateMap<ApplicationUser, GetUserUsersManagementViewItem>()
                .ForMember(x => x.UserId, o => o.MapFrom(user => user.Id))
                .ForMember(x => x.ProfilePhoto, o => o.MapFrom(user => user.ProfilePhoto ?? string.Empty))
                .ForMember(
                x => x.Roles,
                o => o.Ignore()
                );

            CreateMap<ApplicationUser, UserAccountModelItem>()
                .ForMember(x => x.UserId, o => o.MapFrom(user => user.Id))
                .ForMember(x => x.UserName, o => o.MapFrom(user => $@"{user.FirstName ?? string.Empty} {user.LastName ?? string.Empty}"))
                .ForMember(x => x.ProfilePhoto, o => o.MapFrom(user => user.ProfilePhoto ?? string.Empty))
                .ForMember(
                x => x.UserRoles,
                o => o.Ignore()
                );
        }
    }
}
