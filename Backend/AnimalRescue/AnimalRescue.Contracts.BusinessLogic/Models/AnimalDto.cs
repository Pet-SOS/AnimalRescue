using System.Collections.Generic;

namespace AnimalRescue.Contracts.BusinessLogic.Models
{
    public class AnimalDto : BaseDto
    {
        public int Number { get; set; }
        public string Name { get; set; }
        public string KindOfAnimal { get; set; }
        public string Gender { get; set; }
        public string Description { get; set; }
        public int Age { get; set; }
        public List<string> ImageLinks { get; set; }
        public List<string> Tags { get; set; }
    }
}
