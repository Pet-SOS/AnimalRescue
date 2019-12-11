using System;
using System.Collections.Generic;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    public class Animal : BaseItem
    {    
        public long Number { get; set; }
        public string Name { get; set; }
        public string KindOfAnimal { get; set; }
        public string Gender { get; set; }
        public string Description { get; set; }
        public int Age { get; set; }
        public DateTimeOffset DateOfFound { get; set; }
        public DateTimeOffset DateOfAdopted { get; set; } 
        public List<Image> Images { get; set; }
        public List<string> Tags { get; set; }
    }
}
