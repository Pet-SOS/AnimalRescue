using AnimalRescue.DataAccess.Mongodb.Attributes;
using history = AnimalRescue.Contracts.Common.Constants.PropertyConstants.History;

namespace AnimalRescue.API.Models.History
{
    public class DifferenceValueModel
    {
        [CouplingPropertyName(history.PropertyName)]
        public string PropertyName { get; set; }

        [CouplingPropertyName(history.LastValue)]
        public string LastValue { get; set; }

        [CouplingPropertyName(history.NewValue)]
        public string NewValue { get; set; }
    }
}
