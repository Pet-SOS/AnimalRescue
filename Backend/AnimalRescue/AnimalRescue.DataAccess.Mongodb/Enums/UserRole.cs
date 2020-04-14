using System.ComponentModel.DataAnnotations;
using AnimalRescue.Contracts.Common.Constants;

namespace AnimalRescue.DataAccess.Mongodb.Enums
{

    public enum UserRole
    {
        [Display(Name = PropertyConstants.UserRole.Admin)]
        Admin = 0,

        [Display(Name = PropertyConstants.UserRole.Operator)]
        Operator = 1,

        [Display(Name = PropertyConstants.UserRole.Rescuer)]
        Rescuer = 2,

        [Display(Name = PropertyConstants.UserRole.Media)]
        Media = 3
    }
}
