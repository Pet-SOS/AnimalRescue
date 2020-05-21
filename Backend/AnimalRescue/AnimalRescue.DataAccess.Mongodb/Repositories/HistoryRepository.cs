using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models.History;
using AnimalRescue.DataAccess.Mongodb.QueryBuilders;
using MongoDB.Driver;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class HistoryRepository :
        BaseCollection<History>,
        IHistoryRepository
    {
        public HistoryRepository(IMongoDatabase database, IQueryBuilder<History> builder)
            : base(database, builder)
        {
        }
    }
}
