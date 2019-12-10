using AnimalRescue.DataAccess.Mongodb.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces
{
    interface IAnimalCollection : IBaseCollection<Animal>
    {
    }
}
