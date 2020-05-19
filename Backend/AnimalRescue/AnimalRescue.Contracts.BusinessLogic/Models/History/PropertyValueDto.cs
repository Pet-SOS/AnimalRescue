using AnimalRescue.Contracts.BusinessLogic.Attributes;
using history = AnimalRescue.Contracts.Common.Constants.PropertyConstants.History;

namespace AnimalRescue.Contracts.BusinessLogic.Models.History
{
    public class PropertyValueDto
    {
        [CouplingPropertyDto(history.PropertyName)]
        public string PropertyName { get; set; }

        [CouplingPropertyDto(history.LastValue)]
        public string LastValue { get; set; }

        [CouplingPropertyDto(history.NewValue)]
        public string NewValue { get; set; }
    }
}
