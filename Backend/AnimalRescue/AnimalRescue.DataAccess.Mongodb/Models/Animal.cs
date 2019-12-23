using AnimalRescue.DataAccess.Mongodb.Attributes;

using MongoDB.Bson.Serialization.Attributes;

using System;
using System.Collections.Generic;

using animal = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Animal;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    [BsonDiscriminator("animals")]
    public class Animal : BaseItem
    {
        [CouplingPropertyName(animal.Number)]
        [BsonElement("number")] 
        public int Number { get; set; } 
        
        [CouplingPropertyName(common.Name)]
        [BsonElement("name")]     
        public string Name { get; set; }

        [CouplingPropertyName(animal.KindOfAnimal)]
        [BsonElement("kindOfAnimal")] 
        public string KindOfAnimal { get; set; }

        [CouplingPropertyName(animal.Gender)]
        [BsonElement("gender")] 
        public string Gender { get; set; }

        [CouplingPropertyName(common.Description)]
        [BsonElement("description")] 
        public string Description { get; set; }

         [CouplingPropertyName(animal.Age)]
       [BsonElement("age")] 
        public int Age { get; set; }

        [CouplingPropertyName(animal.DateOfFound)]
        [BsonElement("dateOfFound")] 
        public DateTimeOffset DateOfFound { get; set; }

        [CouplingPropertyName(animal.DateOfAdopted)]
        [BsonElement("dateOfAdopted")] 
        public DateTimeOffset? DateOfAdopted { get; set; } 

        [CouplingPropertyName(common.ImageIds)]
        [BsonElement("imageLinks")] 
        public List<string> ImageLinks { get; set; }

        [CouplingPropertyName(common.Tags)]
        [BsonElement("tags")] 
        public List<string> Tags { get; set; }
    }
}
