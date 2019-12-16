using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    [BsonDiscriminator("animals")]
    public class Animal : BaseItem
    {
        [BsonElement("number")] 
        public int Number { get; set; } 
        
        [BsonElement("name")]     
        public string Name { get; set; }

        [BsonElement("kindOfAnimal")] 
        public string KindOfAnimal { get; set; }

        [BsonElement("gender")] 
        public string Gender { get; set; }

        [BsonElement("description")] 
        public string Description { get; set; }

        [BsonElement("age")] 
        public int Age { get; set; }

        [BsonElement("dateOfFound")] 
        public DateTimeOffset DateOfFound { get; set; }

        [BsonElement("dateOfAdopted")] 
        public DateTimeOffset? DateOfAdopted { get; set; } 

        [BsonElement("imageLinks")] 
        public List<string> ImageLinks { get; set; }

        [BsonElement("tags")] 
        public List<string> Tags { get; set; }
    }
}
