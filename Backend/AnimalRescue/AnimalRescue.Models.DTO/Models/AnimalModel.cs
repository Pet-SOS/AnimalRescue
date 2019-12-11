using System.Collections.Generic;

namespace AnimalRescue.Models.DTO.Models
{
    public class AnimalModel : BaseModel
    {  
        public int Number { get; set; }
        public string Name { get; set; }
        public string KindOfAnimal { get; set; }
        public string Gender { get; set; }
        public string Description { get; set; }
        public int Age { get; set; }
        public List<string> Images { get; set; }
        public List<string> Tags { get; set; }
    }
}
