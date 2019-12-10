using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    public class Animal : BaseItem
    {    
        public string ID { get; set; }
        public long Number { get; set; }
        public string Name { get; set; }
        public string KindOfAnimal { get; set; }
        public string Gender { get; set; }
        public string Description { get; set; }
        public int Age { get; set; }
        public List<string> Images { get; set; }
        public List<string> Tags { get; set; }
    }
}
