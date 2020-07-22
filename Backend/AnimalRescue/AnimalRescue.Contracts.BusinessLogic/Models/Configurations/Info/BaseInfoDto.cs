using AnimalRescue.Contracts.BusinessLogic.Attributes;
using System;
using System.Collections.Generic;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Info
{
    public class BaseInfoDto : BaseDto<Guid>
    {
        [CouplingPropertyDto(common.Paragraphs)]
        public List<ParagraphDto> Paragraphs { get; set; }
    }
}
