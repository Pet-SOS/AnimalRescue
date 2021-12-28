using Migration.Runner.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Migration.Runner.Services
{
    interface IAnimalSerivce
    {
        Task Create(IEnumerable<AnimalV0> animals);
    }
}
