using AnimalRescue.Contracts.BusinessLogic.Attributes;

using person = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Person;

namespace AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Info
{
    public class HomePopupDto : BaseInfoDto
    {
        [CouplingPropertyDto(person.Email)]
        public string Email { get; set; }
    }
}
