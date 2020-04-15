using AnimalRescue.Contracts.BusinessLogic.Attributes;
using AnimalRescue.Contracts.BusinessLogic.Models.Tag;
using animal = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Animal;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;
using person = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Person;

namespace AnimalRescue.Contracts.BusinessLogic.Models
{
    public class AnimalLocationDto : BaseCommonDto
    {
        [CouplingPropertyDto(common.Name)]
        public string Name { get; set; }

        [CouplingPropertyDto(person.Phone)]
        public string Phone { get; set; }

        [CouplingPropertyDto(person.Address)]
        public string Address { get; set; }

        [CouplingPropertyDto(common.Price)]
        public string Price { get; set; }

        [CouplingPropertyDto(animal.LocationType)]
        public WellKnownTagDto LocationType { get; set; }
    }
}
