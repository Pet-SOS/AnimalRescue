using AnimalRescue.Contracts.BusinessLogic.Attributes;
using animal = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Animal;

namespace AnimalRescue.Contracts.BusinessLogic.Models
{
    public class SequenceDto : BaseAndTimeDto
    {
        [CouplingPropertyDto(animal.Number)]
        public int Number { get; set; }
    }
}
