using AnimalRescue.Contracts.BusinessLogic.Attributes;

using System.Collections.Generic;

using cms = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Cms;
using person = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Person;

namespace AnimalRescue.Contracts.BusinessLogic.Models.Configurations
{
    public class CmsConfigurationDto : Info.BaseInfoDto
    {
        [CouplingPropertyDto(cms.Phones)]
        public List<string> Phones { get; set; }

        [CouplingPropertyDto(cms.SocialLinks)]
        public Dictionary<string, string> SocialLinks { get; set; }

        [CouplingPropertyDto(person.Emails)]
        public Dictionary<string, string> Emails { get; set; }

        [CouplingPropertyDto(person.Addresses)]
        public Dictionary<string, string> Addresses { get; set; }
    }
}
