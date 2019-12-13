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

        [BsonElement("kind_of_animal")] 
        public string KindOfAnimal { get; set; }

        [BsonElement("gender")] 
        public string Gender { get; set; }

        [BsonElement("description")] 
        public string Description { get; set; }

        [BsonElement("age")] 
        public int Age { get; set; }

        [BsonElement("modified_by")] 
        public DateTimeOffset? ModifiedBy { get; set; }

        [BsonElement("date_of_found")] 
        public DateTimeOffset DateOfFound { get; set; }

        [BsonElement("date_of_adopted")] 
        public DateTimeOffset? DateOfAdopted { get; set; } 

        [BsonElement("image_links")] 
        public List<string> ImageLinks { get; set; }

        [BsonElement("tags")] 
        public List<string> Tags { get; set; }
    }
}
