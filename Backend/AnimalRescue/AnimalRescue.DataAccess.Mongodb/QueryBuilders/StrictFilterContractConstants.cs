using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Extensions;

using MongoDB.Bson;
using MongoDB.Driver;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    public static class StrictFilterContractConstants
    {
        public const string ElementMatch = "elementmatch";
        public const string All = "all";
        public const string Eq = "eq";
        public const string Contains = "contains";
        public const string Gte = "gte";
        public const string Gt = "gt";
        public const string Lte = "lte";
        public const string Lt = "lt";
        public const string Ne = "ne";
        public static IEnumerable<string> AvailableRules
        {
            get
            {
                yield return Eq;
                yield return All;
                yield return Gte;
                yield return Gt;
                yield return Lte;
                yield return Lt;
                yield return Ne;
                yield return Contains;
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
        private static string DeleteParentheses(this string value) => value.TrimStart('(').TrimEnd(')');

        private static FilterDefinition<TE> LookFor<TE>(StrictTerm<TE> term)
        {
            if (term.Alias.PropertyType.IsGenericType)
            {
                switch (term.CommandName)
                {
                    case All:
                        return AllFilterDefinition(term);
                    case ElementMatch:
                        return ElementMatchFilterDefinition(term);

                    default:
                        throw new BadRequestException(nameof(term.CommandName));
                }
            }

            return LookFor<TE>(term.Alias.PropertyType, term.FieldName, term.Content.DeleteQuote(), term.CommandName);
        }

        private static FilterDefinition<TE> AllFilterDefinition<TE>(StrictTerm<TE> term)
        {
            Type type = term.Alias.PropertyType.GenericTypeArguments.First();

            return Builders<TE>.Filter.And(GetListValues(term.Content).Select(x => LookFor<TE>(type, term.FieldName, x.DeleteQuote(), Eq /* term.CommandName */)));
        }

        private static FilterDefinition<TE> ElementMatchFilterDefinition<TE>(StrictTerm<TE> term)
        {
            string termValue = term.Content.DeleteParentheses();
            var filtersForConcat = termValue.GetFilterDefinitions<TE>(term.AliasStore).ToArray();
            var filterForElemMatch = FilterDefinitionExtensions.AND<TE>(filtersForConcat);

            return Builders<TE>.Filter.ElemMatch<TE>(term.FieldName, filterForElemMatch);
        }

        private static FilterDefinition<TE> LookFor<TE>(
            Type propertyType,
            string fieldName,
            string content,
            string operationName)
        {
            if (propertyType == typeof(string))
            {
                if (Eq == operationName)
                {
                    return Builders<TE>.Filter.Regex(fieldName, new BsonRegularExpression(new Regex($"^{content}$", RegexOptions.IgnoreCase)));
                }

                if (Contains == operationName)
                {
                    return Builders<TE>.Filter.Regex(fieldName, new BsonRegularExpression(new Regex(content, RegexOptions.IgnoreCase)));
                }

                if (Ne == operationName)
                {
                    return Builders<TE>.Filter.Regex(fieldName, new BsonRegularExpression(new Regex(content, RegexOptions.IgnoreCase)));
                }
                //return Builders<TE>.Filter.Text(content);
                throw new BadRequestException($"this {nameof(operationName)}: '{operationName}' is not support for this property");
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

            throw new BadRequestException(nameof(propertyType));
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
                case Ne:
                    return Builders<TE>.Filter.Ne(field, parseer(content));
                default:
                    throw new BadRequestException(nameof(operationName));
            }
        }
    }
}
