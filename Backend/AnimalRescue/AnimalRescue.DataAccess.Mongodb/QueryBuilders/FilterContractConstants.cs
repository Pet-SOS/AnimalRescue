using System;
using System.Collections.Generic;

namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    internal class FilterContractConstants
    {
        public const string All = "all";
        public const string Eq = "eq";
        public const string Gte = "gte";
        public const string Gt = "gt";
        public const string Lte = "lte";
        public const string Lt = "lt";
        public const string Ne = "ne";

        public static Dictionary<string, Func<Term, string>> Rulses
            = new Dictionary<string, Func<Term, string>>()
            {
                { All, (term) => $"{term.FieldName}:{{${All}:[{string.Join(",",term.Content.Replace("(","").Replace(")","").Split("^"))}]}}"},
                { Eq, (term) => string.Format("{0}:{1}",term.FieldName, term.Content)},
                { Gte, (term) => $"{term.FieldName}:{{${Gte}:{term.Content}}}" },
                { Gt, (term) => $"{term.FieldName}:{{${Gt}:{term.Content}}}" },
                { Lte, (term) => $"{term.FieldName}:{{${Lte}:{term.Content}}}" },
                { Lt, (term) => $"{term.FieldName}:{{${Lt}:{term.Content}}}" },
                { Ne, (term) => $"{term.FieldName}:{{${Ne}:{term.Content}}}" },
            };
    }
}
