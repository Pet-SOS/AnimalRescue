using AnimalRescue.Contracts.BusinessLogic.Attributes;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;
using cms = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Cms;

namespace AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Donations
{
    public class DonationConfigurationDto : BaseDto
    {
        [CouplingPropertyDto(cms.BankCard)]
        public BankCardDto BankCard { get; set; }

        [CouplingPropertyDto(common.Title)]
        public string Title { get; set; }

        [CouplingPropertyDto(common.Body)]
        public string Body { get; set; }
    }
}
