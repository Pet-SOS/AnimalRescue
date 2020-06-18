using AnimalRescue.Contracts.BusinessLogic.Attributes;
using System.Collections.Generic;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.Contracts.BusinessLogic.Models.Tag
{
    public class TagLargeDto : BaseAndTimeDto<string>
    {
        [CouplingPropertyDto(common.Category)]
        public string Category { get; set; }

        [CouplingPropertyDto(common.Code)]
        public string Code { get; set; }

        [CouplingPropertyDto(common.Values)]
        public List<LanguageValueDto> Values { get; set; }
    }
}
