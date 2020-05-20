using System;
using System.Collections.Generic;
using AnimalRescue.DataAccess.Mongodb.Attributes;
using history = AnimalRescue.Contracts.Common.Constants.PropertyConstants.History;

namespace AnimalRescue.API.Models.History
{
    public class HistoryModel : BaseAndTimeModel<Guid>
    {
        [CouplingPropertyName(history.EntityName)]
        public string EntityName { get; set; }

        [CouplingPropertyName(history.EntityId)]
        public string EntityId { get; set; }

        [CouplingPropertyName(history.IsEntityDeleted)]
        public bool IsEntityDeleted { get; set; }

        [CouplingPropertyName(history.Properties)]
        public ICollection<PropertyValueModel> Properties { get; set; }
    }
}
