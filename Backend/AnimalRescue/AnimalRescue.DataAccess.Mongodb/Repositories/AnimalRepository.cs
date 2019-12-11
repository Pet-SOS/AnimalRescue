using AnimalRescue.DataAccess.Mongodb.Interfaces.Collections;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    public class AnimalRepository : BaseRepository<Animal>, IAnimalRepository
    {
        public AnimalRepository(IAnimalCollection collection) : base(collection)
        {

        }

    }
}
