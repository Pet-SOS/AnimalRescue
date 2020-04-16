using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.QueryBuilders;

using MongoDB.Driver;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class DocumentCollectionRepository : 
        BaseCollection<DocumentCollection>, 
        IDocumentCollectionRepository
    {
        public DocumentCollectionRepository(IMongoDatabase database, IQueryBuilder<DocumentCollection> builder) : base(database, builder)
        {
        }
    }
}
