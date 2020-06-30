using AnimalRescue.Contracts.BusinessLogic.Attributes;
using AnimalRescue.Contracts.BusinessLogic.Models.Tag;
using System;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;
using person = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Person;

namespace AnimalRescue.Contracts.BusinessLogic.Models.Configurations
{
    public class GetHomePopupDto : BaseDto<Guid>
    {
        [CouplingPropertyDto(common.Title)]
        public TagLargeDto Title { get; set; }

        [CouplingPropertyDto(common.Text)]
        public TagLargeDto Text { get; set; }

        [CouplingPropertyDto(person.Email)]
        public string Email { get; set; }
    }
}
