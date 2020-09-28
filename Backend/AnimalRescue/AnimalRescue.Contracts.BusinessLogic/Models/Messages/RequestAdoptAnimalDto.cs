using System;
using AnimalRescue.Contracts.BusinessLogic.Attributes;

using requestAdoptAnimal = AnimalRescue.Contracts.Common.Constants.PropertyConstants.RequestAdoptAnimal;
using person = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Person;

namespace AnimalRescue.Contracts.BusinessLogic.Models.Messages
{
    public class RequestAdoptAnimalDto : BaseAndTimeDto<Guid>
    {
        [CouplingPropertyDto(requestAdoptAnimal.AnimalId)]
        public string AnimalId { get; set; }

        [CouplingPropertyDto(requestAdoptAnimal.AnimalName)]
        public string AnimalName { get; set; }

        [CouplingPropertyDto(requestAdoptAnimal.AdoptiveName)]
        public string AdoptiveName { get; set; }

        [CouplingPropertyDto(person.Phone)]
        public string PhoneNumber { get; set; }
    }
}
