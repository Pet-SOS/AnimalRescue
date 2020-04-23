using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.QueryBuilders;

using MongoDB.Driver;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
	internal class EmployeeRepository : 
		BaseCollection<Employee>,	  
		IEmployeeRepository
	{
        public EmployeeRepository(IMongoDatabase database, IQueryBuilder<Employee> builder) : base(database, builder)
        {
        }
	}
}
