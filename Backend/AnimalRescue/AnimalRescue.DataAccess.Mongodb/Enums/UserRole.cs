using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AnimalRescue.DataAccess.Mongodb.Enums
{

    public enum UserRole
    {
        [Display(Name = "Admin")]
        Admin = 0,

        [Display(Name = "Operator")]
        Operator = 1,

        [Display(Name = "Rescuer")]
        Rescuer = 2,

        [Display(Name = "Media")]
        Media = 3
    }
}
