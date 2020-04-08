using MongoDB.Driver;

using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    public static class QueryAnalyzer
    {
        const char tilda = '~';
        const char semicolon = ';';
        const char leftParentheses = '(';
        const char rightParentheses = ')';

        public static IEnumerable<string> GetRawTerms(this string data)
        {
            StringBuilder stringBuilder = new StringBuilder();
            int countOfBrackets = 0;
            foreach (char currentCharacter in data)
            {
                if (currentCharacter == leftParentheses)
                {
                    countOfBrackets++;
                }
                if (currentCharacter == rightParentheses)
                {
                    countOfBrackets--;
                }


                if (currentCharacter == semicolon && countOfBrackets == 0)
                {
                    yield return stringBuilder.ToString();
                    stringBuilder.Clear();
                }
                else
                {
                    stringBuilder.Append(currentCharacter);
                }
            }

            yield return stringBuilder.ToString();
        }

        public static (string field, string command, string content) GetRawTerm(this string data)
        {
            if (string.IsNullOrWhiteSpace(data))
            {
                return (string.Empty, string.Empty, string.Empty);
            }

            int[] posisions = data
                .Select((x, i) => x == tilda ? i : 0)
                .Where(x => x != 0)
                .Take(2)
                .ToArray();

            if (posisions.Length != 2)
            {
                return (string.Empty, string.Empty, string.Empty);
            }

            string field = data.Substring(0, posisions[0]);
            string command = data.Substring(posisions[0] + 1, posisions[1] - posisions[0] - 1).ToLower();
            string content = data.Substring(posisions[1] + 1);

            return (field, command, content);
        }

        public static FilterDefinition<T> BuildFilterParams<T>(
            string rowFilterParams,
            IAliasStore aliasStore)
        {
            rowFilterParams = AssignDefaults(typeof(T), rowFilterParams);

            var filterArray = rowFilterParams
                .GetFilterDefinitions<T>(aliasStore);

            return Builders<T>.Filter.And(filterArray);
        }

        public static List<FilterDefinition<T>> GetFilterDefinitions<T>(
            this string rowFilterParams,
            IAliasStore aliasStore)
        {
            var rawTerms = rowFilterParams
                .GetRawTerms()
                .ToList();

            var filters = rawTerms
                .Select(data => new StrictTerm<T>(aliasStore, data))
                .Select(term => term.GetDbTermFilterDefinition())
                .ToList();

            return filters;
        }

        private static string AssignDefaults(Type entityType, string filter)
        {
            var prop = entityType.GetProperty("IsDeleted");
            var fieldName = prop?.GetCustomAttribute<BsonElementAttribute>()?.ElementName ?? prop.Name;

            if (string.IsNullOrEmpty(filter))
            {
                return $"{fieldName}~eq~false";
            }

            if (filter.Contains(fieldName, StringComparison.OrdinalIgnoreCase))
            {
                return filter;
            }

            return string.Join(';', filter, $"{fieldName}~eq~false");
        }
    }
}
