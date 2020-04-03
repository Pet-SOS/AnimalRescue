using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using AnimalRescue.DataAccess.Mongodb.Models.Tag;

using MongoDB.Bson.Serialization.Attributes;

using System;
using System.Collections.Generic;

using animal = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Animal;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    [BsonDiscriminator("animals")]
    public class Animal : BaseAndTimeItem
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
        public DateTime DateOfFound { get; set; }

        [CouplingPropertyName(animal.DateOfAdopted)]
        [BsonElement("dateOfAdopted")] 
        public DateTime? DateOfAdopted { get; set; } 

        [CouplingPropertyName(common.ImageIds)]
        [BsonElement("imageLinks")] 
        public List<string> ImageIds { get; set; }

        [CouplingPropertyName(common.Tags)]
        [BsonElement("tags")] 
        public List<string> Tags { get; set; }


        [CouplingPropertyName(animal.CoverImage)]
        [BsonElement("coverImage")]
        public int CoverImage { get; set; }

        [CouplingPropertyName(animal.Birthday)]
        [BsonElement("birthday")]
        public DateTime Birthday { get; set; }

        [CouplingPropertyName(animal.Character)]
        [BsonElement("character")]
        public string Character { get; set; }

        [CouplingPropertyName(common.NewTags)]
        [BsonElement("newTags")]
        public List<NestedTag> NewTags { get; set; }
    }
}
