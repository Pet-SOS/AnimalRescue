using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.QueryBuilders;
using MongoDB.Driver;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class RequestAdoptAnimalRepository : BaseCollection<RequestAdoptAnimal>, IRequestAdoptAnimalRepository
    {
        public RequestAdoptAnimalRepository(IMongoDatabase database, IQueryBuilder<RequestAdoptAnimal> builder) 
            : base(database, builder)
        {
        }
    }
}
