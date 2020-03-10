using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Query;
using AnimalRescue.Infrastructure.Validation;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
	internal class EmployeeRepository : IEmployeeRepository
	{
        private readonly IBaseCollection<Employee> _baseCollection;

        public EmployeeRepository(IBaseCollection<Employee> baseCollection)
        {
            Require.Objects.NotNull(baseCollection, nameof(baseCollection));

			_baseCollection = baseCollection;
        }

		public async Task<Employee> CreateAsync(Employee employee)
		{
			Require.Objects.NotNull(employee, nameof(employee));

			employee.CreatedAt = DateTime.Now;
			employee.Id = string.Empty;

			return await _baseCollection.CreateAsync(employee);
		}

		public async Task DeleteAsync(string id)
		{
			Require.Strings.NotNullOrWhiteSpace(id, nameof(id));

			await _baseCollection.DeleteAsync(id);
		}

		public async Task<List<Employee>> GetAsync(DbQuery query)
		{
			return await _baseCollection.GetAsync(query);
		}

		public async Task<Employee> GetAsync(string id)
		{
			return await _baseCollection.GetAsync(id);
		}

		public async Task<int> GetCountAsync(DbQuery query)
		{
			return await _baseCollection.GetCountAsync(query);
		}

		public async Task UpdateAsync(Employee employee)
		{
			Require.Objects.NotNull(employee, nameof(employee));

			var oldEmployee = await _baseCollection.GetAsync(employee.Id);

			Require.Objects.NotNull<NotFoundException>(oldEmployee, 
				() => $"{employee.Name} with id: {employee.Id} not found");

			oldEmployee.Name = employee.Name;
			oldEmployee.Description = employee.Description;
			oldEmployee.ModifiedAt = DateTime.Now;

			await _baseCollection.UpdateAsync(oldEmployee);
		}
	}
}
