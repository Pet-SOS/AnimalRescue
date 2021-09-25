﻿using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;

using MongoDB.Bson.Serialization.Attributes;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;
using animal = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Animal;
using person = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Person;

using AnimalRescue.DataAccess.Mongodb.Models.Tag;
using System;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    [BsonDiscriminator("requests")]
    public class Request : BaseAndTimeItem
    {
        [CouplingPropertyName(common.Case)]
        [BsonElement("case")]
        public WellKnownTag Case { get; set; }

        [CouplingPropertyName(common.CaseDescription)]
        [BsonElement("caseDescription")]
        public string CaseDescription { get; set; }

        [CouplingPropertyName(animal.KindOfAnimal)]
        [BsonElement("kindOfAnimal")]
        public WellKnownTag KindOfAnimal { get; set; }

        [CouplingPropertyName(animal.AnimalState)]
        [BsonElement("animalState")]
        public WellKnownTag AnimalState { get; set; }

        [CouplingPropertyName(animal.Status)]
        [BsonElement("status")]
        public WellKnownTag Status { get; set; }

        [CouplingPropertyName(animal.Birthday)]
        [BsonElement("birthday")]
        public DateTime Birthday { get; set; }

        [CouplingPropertyName(person.Address)]
        [BsonElement("address")]
        public string Address { get; set; }

        [CouplingPropertyName(person.PersonState)]
        [BsonElement("personState")]
        public WellKnownTag PersonState { get; set; }

        [CouplingPropertyName(person.FirstName)]
        [BsonElement("firstName")]
        public string FirstName { get; set; }

        [CouplingPropertyName(person.LastName)]
        [BsonElement("lastName")]
        public string LastName { get; set; }

        [CouplingPropertyName(person.Phone)]
        [BsonElement("phone")]
        public string Phone { get; set; }
    }
}
