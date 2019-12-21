using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.Infrastructure.Validation;

using MongoDB.Bson.Serialization.Attributes;

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

        public string BuildStringSortParams<T>(string rowSortParams)
        {
            var dataArray = rowSortParams
                ?.Split(TermSeparator)
                .Where(x=>!string.IsNullOrWhiteSpace(x))
                .ToArray();

            if (dataArray == null)
            {
                return DefaultSort;
            }

            PropertyInfo[] properties = typeof(T).GetProperties();

            var sortArrey = dataArray
                .Select(row => GetRealPropNameOrThrowException<T>(properties, row, OrderSeparator))
                .Select(x => x.Replace(Descending, "-1").Replace(Ascending, "1"));

            var result = $"{{{string.Join(",", sortArrey)}}}";
                   
            return result;
        }

        private static string GetRealPropNameOrThrowException<T>(
            PropertyInfo[] properties, 
            string rowValue, 
            string firstSeparator)
        {
            string[] dataArray = rowValue?.Split(firstSeparator);

            Func<string> message = () => $"Specified order value: '{rowValue}' is not valid";
            Require.Collections.NotEmpty<BadRequestException, string>(dataArray, message);
            Require.Booleans.IsTrue<BadRequestException>(dataArray.Count() == 2, message);
            Require.Strings.NotNullOrWhiteSpace<BadRequestException>(dataArray[0], message);
            Require.Strings.NotNullOrWhiteSpace<BadRequestException>(dataArray[1], message);
            
            PropertyInfo property = properties
                .FirstOrDefault(x => {
                    var attr = x.GetCustomAttribute<CouplingPropertyNameAttribute>();
                    return attr == null
                        ? false
                        : attr.Name
                            .Equals(dataArray[0], StringComparison.OrdinalIgnoreCase);
                });

            var realDbPropertyName = property?.GetCustomAttribute<BsonElementAttribute>()?.ElementName;

            Require.Strings.NotNullOrWhiteSpace<BadRequestException>(realDbPropertyName, message);

            Require.Booleans.IsTrue<BadRequestException>(
                dataArray[1].Equals(Ascending, StringComparison.OrdinalIgnoreCase)
                || dataArray[1].Equals(Descending, StringComparison.OrdinalIgnoreCase), message);

            return rowValue.Replace(dataArray[0], realDbPropertyName);
        }
    }
}
