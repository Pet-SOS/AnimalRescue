using System;
using System.Collections.Generic;
using AnimalRescue.Contracts.BusinessLogic.Attributes;

using history = AnimalRescue.Contracts.Common.Constants.PropertyConstants.History;

namespace AnimalRescue.Contracts.BusinessLogic.Models.History
{
    public class HistoryDto : BaseAndTimeDto<Guid>
    {
        [CouplingPropertyDto(history.EntityName)]
        public string EntityName { get; set; }

        [CouplingPropertyDto(history.EntityId)]
        public string EntityId { get; set; }

        [CouplingPropertyDto(history.IsEntityDeleted)]
        public bool IsEntityDeleted { get; set; }

        [CouplingPropertyDto(history.Differences)]
        public ICollection<DifferenceValueDto> Differences { get; set; }
    }
}
