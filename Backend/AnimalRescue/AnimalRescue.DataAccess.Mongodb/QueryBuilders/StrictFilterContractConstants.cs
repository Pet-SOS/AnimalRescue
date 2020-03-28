using MongoDB.Bson;
using MongoDB.Driver;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    internal static class StrictFilterContractConstants
    {
        public const string ElementMatch = "elementmatch";
        public const string All = "all";
        public const string Eq = "eq";
        public const string Gte = "gte";
        public const string Gt = "gt";
        public const string Lte = "lte";
        public const string Lt = "lt";
        public static IEnumerable<string> AvailableRules { get 
            {
                yield return Eq;
                yield return All;
                yield return Gte;
                yield return Gt;
                yield return Lte;
                yield return Lt;
                yield return ElementMatch;
            }
        }
        public static FilterDefinition<TE> GetFilterDefinition<TE>(this StrictTerm<TE> strictTerm)
        {
            return LookFor(strictTerm);
        }

        private static List<string> GetListValues(this string value) =>
            value.Replace("(", "").Replace(")", "").Split("^").Select(DeleteQuote).ToList();
        private static string DeleteQuote(this string value) => value.TrimStart('\'').TrimEnd('\'');

        private static FilterDefinition<TE> LookFor<TE>(StrictTerm<TE> term)
        {
            if (term.Alias.PropertyType.IsGenericType)
            {
                Type type = term.Alias.PropertyType.GenericTypeArguments.First();
                return Builders<TE>.Filter.And(GetListValues(term.Content).Select(x => LookFor<TE>(type, term.FieldName, x.DeleteQuote(), term.CommandName)));
            }

            return LookFor<TE>(term.Alias.PropertyType, term.FieldName, term.Content.DeleteQuote(), term.CommandName);
        }
        private static FilterDefinition<TE> LookFor<TE>(
            Type propertyType,
            string fieldName,
            string content,
            string operationName)
        {
            if (propertyType == typeof(string))
            {
                return Builders<TE>.Filter.Regex(fieldName, new BsonRegularExpression(new Regex(content, RegexOptions.IgnoreCase)));
                //return Builders<TE>.Filter.Text(content);
            }

            if (propertyType == typeof(int))
            {
                return LookFor<TE, int>(fieldName, content, int.Parse, operationName);
            }

            if (propertyType == typeof(DateTime))
            {
                return LookFor<TE, DateTime>(fieldName, content, DateTime.Parse, operationName);
            }

            if (propertyType == typeof(bool))
            {
                return LookFor<TE, bool>(fieldName, content, bool.Parse, operationName);
            }

            throw new ArgumentException(nameof(propertyType));
        }

        private static FilterDefinition<TE> LookFor<TE, TField>(
            string fieldName,
            string content,
            Func<string, TField> parseer,
            string operationName)
        {
            FieldDefinition<TE, TField> field = fieldName;

            switch (operationName)
            {
                case Eq:
                    return Builders<TE>.Filter.Eq(field, parseer(content));
                case Gte:
                    return Builders<TE>.Filter.Gte(field, parseer(content));
                case Gt:
                    return Builders<TE>.Filter.Gt(field, parseer(content));
                case Lte:
                    return Builders<TE>.Filter.Lte(field, parseer(content));
                case Lt:
                    return Builders<TE>.Filter.Lt(field, parseer(content));
                default:
                    throw new ArgumentException(nameof(operationName));
            }
        }
    }
}
