using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.QueryBuilders;

using MongoDB.Driver;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
	internal class RequestRepository : 
		BaseCollection<Request>,	  
		IRequestRepository
	{
        public RequestRepository(IMongoDatabase database, IQueryBuilder<Request> builder) : base(database, builder)
        {
        }
	}
}
