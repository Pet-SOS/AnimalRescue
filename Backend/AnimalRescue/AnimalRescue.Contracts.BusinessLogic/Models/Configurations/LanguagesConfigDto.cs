using AnimalRescue.Contracts.BusinessLogic.Attributes;
using System.Collections.Generic;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.Contracts.BusinessLogic.Models.Configurations
{
    public class LanguagesConfigDto
    {
        [CouplingPropertyDto(common.Languages)]
        public Dictionary<string, bool> Languages { get; set; }
    }
}
