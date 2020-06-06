using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.QueryBuilders;
using MongoDB.Driver;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class MigrationHistoryRepository : 
        BaseCollection<MigrationHistory>,
        IMigrationHistoryRepository
    {
        public MigrationHistoryRepository(IMongoDatabase database, IQueryBuilder<MigrationHistory> builder) : base(database, builder)
        {
        }
    }
}