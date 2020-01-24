using AnimalRescue.Contracts.BusinessLogic.Attributes;
using baseItem = AnimalRescue.Contracts.Common.Constants.PropertyConstants.BaseItem;

namespace AnimalRescue.Contracts.BusinessLogic.Models
{
    public class BaseDto
    {
        [CouplingPropertyDto(baseItem.Id)]
        public string Id { get; set; }
    }
}
