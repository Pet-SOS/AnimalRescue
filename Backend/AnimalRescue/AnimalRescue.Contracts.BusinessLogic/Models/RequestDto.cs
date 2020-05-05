using AnimalRescue.Contracts.BusinessLogic.Attributes;
using AnimalRescue.Contracts.BusinessLogic.Models.Tag;
using System;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;
using animal = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Animal;
using person = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Person;

namespace AnimalRescue.Contracts.BusinessLogic.Models
{
    public class RequestDto : BaseAndTimeDto<Guid>
    {
        [CouplingPropertyDto(common.Case)]
        public WellKnownTagDto Case { get; set; }

        [CouplingPropertyDto(animal.KindOfAnimal)]
        public string KindOfAnimal { get; set; }

        [CouplingPropertyDto(animal.Status)]
        public WellKnownTagDto Status { get; set; }

        [CouplingPropertyDto(animal.Age)]
        public int Age { get; set; }

        [CouplingPropertyDto(person.Address)]
        public string Address { get; set; }

        [CouplingPropertyDto(person.FirstName)]
        public string FirstName { get; set; }

        [CouplingPropertyDto(person.LastName)]
        public string LastName { get; set; }

        [CouplingPropertyDto(person.Phone)]
        public string Phone { get; set; }
    }
}
