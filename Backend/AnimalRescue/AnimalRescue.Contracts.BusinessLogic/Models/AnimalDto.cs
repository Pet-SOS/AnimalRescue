using System;
using AnimalRescue.Contracts.BusinessLogic.Attributes;
using AnimalRescue.Contracts.BusinessLogic.Models.Tag;
using animal = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Animal;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.Contracts.BusinessLogic.Models
{
    public class AnimalDto : BaseCommonDto
    {
        public int Number { get; set; }

        [CouplingPropertyDto(common.Name)]
        public string Name { get; set; }

        [CouplingPropertyDto(animal.KindOfAnimal)]
        public string KindOfAnimal { get; set; }

        [CouplingPropertyDto(animal.Gender)]
        public string Gender { get; set; }

        public string Description { get; set; }

        public int Age { get; set; }

        public int CoverImage { get; set; }

        public DateTime Birthday { get; set; }

        public string Character { get; set; }

        [CouplingPropertyDto(animal.Status)]
        public WellKnownTagDto Status { get; set; }

        [CouplingPropertyDto(animal.LocationType)]
        public LocationDto LocationType { get; set; }

        [CouplingPropertyDto(animal.LocationName)]
        public WellKnownTagDto LocationName { get; set; }

        [CouplingPropertyDto(animal.IsDonationActive)]
        public bool IsDonationActive { get; set; }

        [CouplingPropertyDto(animal.BannerText)]
        public string BannerText { get; set; }
    }
}
