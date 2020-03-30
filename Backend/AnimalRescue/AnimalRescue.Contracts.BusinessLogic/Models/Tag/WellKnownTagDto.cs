using AnimalRescue.Contracts.BusinessLogic.Attributes;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;
using animal = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Animal;
using System.Collections.Generic;

namespace AnimalRescue.Contracts.BusinessLogic.Models.Tag
{
    public class WellKnownTagDto : BaseAndTimeDto
    {
        [CouplingPropertyDto(common.Category)]
        public string Category { get; set; }

        [CouplingPropertyDto(animal.KindOfAnimal)]
        public string KindOfAnimal { get; set; }

        [CouplingPropertyDto(common.Code)]
        public string Code { get; set; }

        [CouplingPropertyDto(common.Values)]
        public List<LanguageValueDto> Values { get; set; }
    }
}
