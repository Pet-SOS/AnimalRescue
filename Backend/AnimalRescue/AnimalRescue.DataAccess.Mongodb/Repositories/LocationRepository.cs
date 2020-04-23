using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.QueryBuilders;

using MongoDB.Driver;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class LocationRepository :
        BaseCollection<Location>, 
        ILocationRepository
    {
        public LocationRepository(IMongoDatabase database, IQueryBuilder<Location> builder) 
            : base(database, builder)
        {
        }
    }
}
