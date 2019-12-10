using System;
using System.Collections.Generic;
using System.Text;

namespace AnimalRescue.Models.DTO.Models
{
    class RescueRequestModel
    {
        public UserModel User { get; set; }
        public AnimalModel Animal { get; set; }
    }

}
