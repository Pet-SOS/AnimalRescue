using AnimalRescue.Contracts.BusinessLogic.Attributes;

using System;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.Contracts.BusinessLogic.Models.Tag
{
    public class LanguageValueDto : BaseAndTimeDto<Guid>
    {
        [CouplingPropertyDto(common.Lang)]
        public string Lang { get; set; }

        [CouplingPropertyDto(common.Value)]
        public string Value { get; set; }
    }
}
