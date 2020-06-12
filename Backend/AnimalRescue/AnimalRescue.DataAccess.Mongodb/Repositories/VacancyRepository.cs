using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.QueryBuilders;

using MongoDB.Driver;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
	internal class VacancyRepository : 
		BaseCollection<Vacancy>,
		IVacancyRepository
	{
        public VacancyRepository(IMongoDatabase database, IQueryBuilder<Vacancy> builder) : base(database, builder)
        {
        }
	}
}
