using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.Infrastructure.Validation;

using System;
using System.Linq;
using System.Reflection;

namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    internal class QuerySortBuilder : IQuerySortBuilder
    {
        public const string OrderSeparator = ":";
        public const string TermSeparator = ";";
        public const string Descending = "decs";
        public const string Ascending = "acs";
        private const string DefaultSort = "{}";
        private readonly IAliasStore aliasStore;

        public QuerySortBuilder(IAliasStore aliasStore)
        {
            Require.Objects.NotNull<BadRequestException>(aliasStore, nameof(aliasStore));

            this.aliasStore = aliasStore;
        }
        public string BuildStringSortParams<T>(string rowSortParams)
        {
            var dataArray = rowSortParams
                ?.Split(TermSeparator)
                .Where(x => !string.IsNullOrWhiteSpace(x))
                .ToArray();

            if (dataArray == null)
            {
                return DefaultSort;
            }

            var sortArrey = dataArray
                .Select(row => GetOrderTermOrThrowException<T>(row, OrderSeparator))
                .Select(x => x.Replace(Descending, "-1").Replace(Ascending, "1"));

            var result = $"{{{string.Join(",", sortArrey)}}}";

            return result;
        }

        private string GetOrderTermOrThrowException<T>(
            string rowValue,
            string firstSeparator)
        {
            string[] dataArray = rowValue?.Split(firstSeparator);

            Func<string> message = () => $"Specified order value: '{rowValue}' is not valid";
            Require.Collections.NotEmpty<BadRequestException, string>(dataArray, message);
            Require.Booleans.IsTrue<BadRequestException>(dataArray.Count() == 2, message);
            Require.Strings.NotNullOrWhiteSpace<BadRequestException>(dataArray[0], message);
            Require.Strings.NotNullOrWhiteSpace<BadRequestException>(dataArray[1], message);

            Alias alias = aliasStore.GetAlias<T>(dataArray[0]);

            Require.Objects.NotNull<BadRequestException>(alias, message);

            Require.Booleans.IsTrue<BadRequestException>(
                dataArray[1].Equals(Ascending, StringComparison.OrdinalIgnoreCase)
                || dataArray[1].Equals(Descending, StringComparison.OrdinalIgnoreCase), message);

            return rowValue.Replace(dataArray[0], alias.DataBasePropertyName);
        }
    }
}
