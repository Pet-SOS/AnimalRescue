using AnimalRescue.Contracts.BusinessLogic.Attributes;
using AnimalRescue.Contracts.BusinessLogic.Models.Tag;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;
using person = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Person;

namespace AnimalRescue.Contracts.BusinessLogic.Models
{
    public class LocationDto : BaseCommonDto
    {
        [CouplingPropertyDto(common.Title)]
        public string Title { get; set; }

        [CouplingPropertyDto(person.Phone)]
        public string Phone { get; set; }

        [CouplingPropertyDto(person.Address)]
        public string Address { get; set; }

        [CouplingPropertyDto(common.Price)]
        public string Price { get; set; }

        [CouplingPropertyDto(common.Type)]
        public WellKnownTagDto Type { get; set; }
    }
}
