using MongoDB.Driver;

using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

using baseItem = AnimalRescue.Contracts.Common.Constants.PropertyConstants.BaseItem;

namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    public static class QueryAnalyzer
    {
        static string notDeletedExpr = $"{baseItem.IsDeleted}~{StrictFilterContractConstants.Eq}~'false'";

        static Regex orRegex = new Regex("{(.*?)}(or)?", RegexOptions.Compiled);
        const char tilda = '~';
        const char semicolon = ';';
        const char leftParentheses = '(';
        const char rightParentheses = ')';

        public static IEnumerable<string> GetRawTerms(this string data)
        {
            StringBuilder stringBuilder = new StringBuilder();

            if (!string.IsNullOrWhiteSpace(data))
            {
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
            if (!string.IsNullOrWhiteSpace(rowFilterParams))
            {
                var orRules = orRegex.Matches(rowFilterParams)
                    .Cast<Match>()
                    .Select(m => m.Groups.Values?.ElementAt(1)?.Value)
                    .Where(x => !string.IsNullOrWhiteSpace(x))
                    .Select(x=> $"{notDeletedExpr};{x}")
                    .ToArray();

                if (orRules.Length > 0)
                {
                    var filterDefinitionArray = orRules
                        .Select(x => x.GetFilterDefinitions<T>(aliasStore))
                        .Select(x => Builders<T>.Filter.And(x))
                        .ToArray();

                    var orResult = Builders<T>.Filter.Or(filterDefinitionArray);
                    
                    return orResult;
                }
            }

            var filterArrey = rowFilterParams?
                .GetFilterDefinitions<T>(aliasStore);

            var result = filterArrey != null
                ? Builders<T>.Filter.And(filterArrey)
                : Builders<T>.Filter.Empty;

            return result;
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
    }
}
