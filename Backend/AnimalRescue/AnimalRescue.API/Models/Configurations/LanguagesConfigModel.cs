using AnimalRescue.Contracts.BusinessLogic.Attributes;
using System.Collections.Generic;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.API.Models.Configurations
{
    public class LanguagesConfigModel
    {
        [CouplingPropertyDto(common.Languages)]
        public Dictionary<string, bool> Languages { get; set; }
    }
}
