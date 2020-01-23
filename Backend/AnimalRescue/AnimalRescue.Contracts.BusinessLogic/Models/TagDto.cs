using AnimalRescue.Contracts.BusinessLogic.Attributes;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.Contracts.BusinessLogic.Models
{
    public class TagDto : BaseAndTimeDto
    {
        [CouplingPropertyDto(common.Type)]
        public string Type { get; set; }

        [CouplingPropertyDto(common.Title)]
        public string Title { get; set; }
    }
}
