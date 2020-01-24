using AnimalRescue.Contracts.BusinessLogic.Attributes;
using person = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Person;
using cms = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Cms;

namespace AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Donations
{
    public class BankCardDto
    {
        [CouplingPropertyDto(cms.CardNumber)]
        public string CardNumber { get; set; }

        [CouplingPropertyDto(cms.EDRPOU)]
        public string EDRPOU { get; set; }

        [CouplingPropertyDto(cms.BankName)]
        public string BankName { get; set; }

        [CouplingPropertyDto(person.FirstName)]
        public string FirstName { get; set; }

        [CouplingPropertyDto(person.LastName)]
        public string LastName { get; set; }
    }
}
