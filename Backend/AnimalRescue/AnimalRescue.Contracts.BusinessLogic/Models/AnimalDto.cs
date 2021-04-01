using System;
using System.Collections.Generic;
using AnimalRescue.Contracts.BusinessLogic.Attributes;
using AnimalRescue.Contracts.BusinessLogic.Models.Tag;
using animal = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Animal;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.Contracts.BusinessLogic.Models
{
    public class AnimalDto : BaseCommonDto
    {
        public int Number { get; set; }

        [CouplingPropertyDto(animal.Names)]
        public List<LanguageValueDto> Names { get; set; }

        [CouplingPropertyDto(animal.KindOfAnimal)]
        public string KindOfAnimal { get; set; }

        [CouplingPropertyDto(animal.Gender)]
        public string Gender { get; set; }

        public List<LanguageValueDto> Description { get; set; }

        public int CoverImage { get; set; }

        public DateTime Birthday { get; set; }

        public List<LanguageValueDto> Character { get; set; }

        [CouplingPropertyDto(animal.Status)]
        public WellKnownTagDto Status { get; set; }

        [CouplingPropertyDto(animal.LocationTypeId)]
        public Guid LocationTypeId { get; set; }

        [CouplingPropertyDto(animal.LocationName)]
        public string LocationName { get; set; }

        [CouplingPropertyDto(animal.IsDonationActive)]
        public bool IsDonationActive { get; set; }

        [CouplingPropertyDto(animal.BannerText)]
        public List<LanguageValueDto> BannerText { get; set; }

        [CouplingPropertyDto(animal.AdoptiveName)]
        public string AdoptiveName { get; set; }

        [CouplingPropertyDto(animal.AdoptivePhone)]
        public string AdoptivePhone { get; set; }

        [CouplingPropertyDto(animal.AdoptionContractFileId)]
        public Guid? AdoptionContractFileId { get; set; }
    }
}
