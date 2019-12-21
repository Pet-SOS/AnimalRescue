using System.Collections.Generic;
using Newtonsoft.Json;
using animal = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Animal;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.API.Models
{
    public class AnimalModel : BaseModel
    {
        [JsonProperty(PropertyName = animal.Number)]
        public int Number { get; set; }

        [JsonProperty(PropertyName = common.Name)]
        public string Name { get; set; }

        [JsonProperty(PropertyName = animal.KindOfAnimal)]
        public string KindOfAnimal { get; set; }

        [JsonProperty(PropertyName = animal.Gender)]
        public string Gender { get; set; }

        [JsonProperty(PropertyName = common.Description)]
        public string Description { get; set; }

        [JsonProperty(PropertyName = animal.Age)]
        public int Age { get; set; }

        [JsonProperty(PropertyName = common.ImageIds)]
        public List<string> ImageLinks { get; set; }

        [JsonProperty(PropertyName = common.Tags)]
        public List<string> Tags { get; set; }
    }
}
