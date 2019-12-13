using AnimalRescue.DataAccess.Mongodb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
	public interface IBaseRepository<T>
		where T : BaseItem
	{
		Task<List<T>> GetAsync();
		Task<T> GetAsync(string id);
		Task<List<T>> GetAsync(int pageNumber, int pageSize, Expression<Func<T, object>> sortFrield);
		Task UpdateAsync(string id, T instance);
		Task RemoveAsync(T instance);
		Task RemoveAsync(string id);
		Task<T> CreateAsync(T instance);
	}
}
