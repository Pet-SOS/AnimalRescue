using System;
using System.Collections.Generic;

namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    internal class FilterContractConstants
    {
        public const string All = "all";
        public const string Eq = "eq";
        public static Dictionary<string, Func<Term, string>> Rulses
            = new Dictionary<string, Func<Term, string>>()
            {
                { All, (term) => $"{term.FieldName}:{{${All}:[{string.Join(",",term.Content.Replace("(","").Replace(")","").Split("^"))}]}}"},
                { Eq, (term) => string.Format("{0}:{1}",term.FieldName, term.Content)}
            };
    }
}
