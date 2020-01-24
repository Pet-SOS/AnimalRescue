using AnimalRescue.Contracts.BusinessLogic.Attributes;
using animal = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Animal;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.Contracts.BusinessLogic.Models
{
    public class AnimalDto : BaseCommonDto
    {
        [CouplingPropertyDto(animal.Number)]
        public int Number { get; set; }

        [CouplingPropertyDto(common.Name)]
        public string Name { get; set; }

        [CouplingPropertyDto(animal.KindOfAnimal)]
        public string KindOfAnimal { get; set; }

        [CouplingPropertyDto(animal.Gender)]
        public string Gender { get; set; }

        [CouplingPropertyDto(common.Description)]
        public string Description { get; set; }

        [CouplingPropertyDto(animal.Age)]
        public int Age { get; set; }
    }
}
