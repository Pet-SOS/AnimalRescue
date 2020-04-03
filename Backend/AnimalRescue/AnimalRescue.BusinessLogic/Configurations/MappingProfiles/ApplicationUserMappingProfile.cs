using AnimalRescue.Contracts.BusinessLogic.Models.Account;
using AnimalRescue.Contracts.BusinessLogic.Models.UsersManagement;
using AnimalRescue.DataAccess.Mongodb.Models;
using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace AnimalRescue.BusinessLogic.Configurations.MappingProfiles
{
    class ApplicationUserMappingProfile : Profile
    {
        public ApplicationUserMappingProfile(UserManager<ApplicationUser> userManager)
        {
            CreateMap<ApplicationUser, GetUserUsersManagementViewItem>()
                .ForMember(x => x.UserId, o => o.MapFrom(user => user.Id))
                .ForMember(x => x.ProfilePhoto, o => o.MapFrom(user => user.ProfilePhoto ?? string.Empty))
                .ForMember(
                x => x.Roles,
                o => o.MapFrom(user => userManager.GetRolesAsync(user).GetAwaiter().GetResult())
                );

            CreateMap<ApplicationUser, UserAccountModelItem>()
                .ForMember(x => x.UserId, o => o.MapFrom(user => user.Id))
                .ForMember(x => x.UserName, o => o.MapFrom(user => $@"{user.FirstName ?? string.Empty} {user.LastName ?? string.Empty}"))
                .ForMember(x => x.ProfilePhoto, o => o.MapFrom(user => user.ProfilePhoto ?? string.Empty))
                .ForMember(
                x => x.UserRoles,
                o => o.MapFrom(user => userManager.GetRolesAsync(user).GetAwaiter().GetResult())
                );
        }
    }
}
