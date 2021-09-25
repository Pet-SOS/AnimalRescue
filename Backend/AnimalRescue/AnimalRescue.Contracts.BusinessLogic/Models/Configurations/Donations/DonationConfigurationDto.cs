using AnimalRescue.Contracts.BusinessLogic.Attributes;
using System;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Donations
{
    public class DonationConfigurationDto : BaseDto<Guid>
    {
        [CouplingPropertyDto(common.Body)]
        public string Body { get; set; }
    }
}
