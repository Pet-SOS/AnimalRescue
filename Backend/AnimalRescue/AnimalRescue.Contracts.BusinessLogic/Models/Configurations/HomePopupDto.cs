using AnimalRescue.Contracts.BusinessLogic.Attributes;
using AnimalRescue.Contracts.BusinessLogic.Models.Tag;

using System;
using System.Collections.Generic;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;
using person = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Person;

namespace AnimalRescue.Contracts.BusinessLogic.Models.Configurations
{
    public class HomePopupDto : BaseDto<Guid>
    {
        [CouplingPropertyDto(common.Title)]
        public List<LanguageValueDto> Title { get; set; }

        [CouplingPropertyDto(common.Text)]
        public List<LanguageValueDto> Text { get; set; }

        [CouplingPropertyDto(person.Email)]
        public string Email { get; set; }
    }
}
