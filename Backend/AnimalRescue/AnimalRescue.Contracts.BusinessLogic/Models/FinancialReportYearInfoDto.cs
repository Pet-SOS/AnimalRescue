using AnimalRescue.Contracts.BusinessLogic.Attributes;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Info;
using System;
using System.Collections.Generic;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.Contracts.BusinessLogic.Models
{
    public class FinancialReportYearInfoDto : BaseAndTimeDto<Guid>
    {
        public int Year { get; set; }

        [CouplingPropertyDto(common.Paragraphs)]
        public List<ParagraphDto> Paragraphs { get; set; }
    }
}
