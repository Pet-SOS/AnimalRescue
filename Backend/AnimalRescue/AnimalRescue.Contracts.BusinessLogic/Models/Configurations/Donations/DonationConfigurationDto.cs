using AnimalRescue.Contracts.BusinessLogic.Attributes;

using System;

using cms = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Cms;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Donations
{
    public class DonationConfigurationDto : BaseDto<Guid>
    {
        [CouplingPropertyDto(cms.BankCard)]
        public BankCardDto BankCard { get; set; }

        [CouplingPropertyDto(common.Title)]
        public string Title { get; set; }

        [CouplingPropertyDto(common.Body)]
        public string Body { get; set; }
    }
}
