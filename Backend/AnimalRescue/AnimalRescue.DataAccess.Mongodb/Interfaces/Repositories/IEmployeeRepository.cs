using AnimalRescue.Contracts.Common.Interfaces.CRUD;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Query;

using System.Collections.Generic;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
	public interface IEmployeeRepository :
		IBaseQuerAsyncy<List<Employee>, DbQuery>,
		IBaseQuerAsyncy<Employee, string>,
		IBaseCountQueryAsync<DbQuery>,
		IBaseCreateAsync<Employee>,
		IBaseUpdateAsync<Employee>,
		IBaseDeleteAsync<string>
	{
	}
}
