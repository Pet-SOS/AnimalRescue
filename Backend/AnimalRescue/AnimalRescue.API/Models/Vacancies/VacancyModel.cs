using Newtonsoft.Json;

using System;
using System.Text.Json.Serialization;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.API.Models.Vacancies
{
    public class VacancyModel : BaseAndTimeModel<Guid>
    {
        [JsonPropertyName(common.Name)]
        [JsonProperty(common.Name)]
        public string Name { get; set; }

        [JsonPropertyName(common.Description)]
        [JsonProperty(common.Description)]
        public string Description { get; set; }
    }
}
