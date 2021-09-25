using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using AnimalRescue.Infrastructure.Helpers;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace AnimalRescue.DataAccess.Mongodb.Extensions
{
    public static class DboExtentions
    {
        public static TDbo UpdateFrom<TDbo>(this TDbo to, TDbo from)
            where TDbo : IBaseAuditItem
        {
            TDbo temp = Activator.CreateInstance<TDbo>();
            var properties = typeof(TDbo)
                .GetProperties()
                .Where(x => x.GetCustomAttribute<CouplingPropertyNameAttribute>() is CouplingPropertyNameAttribute attr && attr.IsMutable)
                .ToList();

            Update(to, from, properties);

            to.ModifiedAt = DateHelper.GetUtc();

            return to;
        }

        private static void Update<TDbo>(TDbo to, TDbo from, IEnumerable<PropertyInfo> properties)
            where TDbo : IBaseAuditItem
        {
            foreach (var currentProperty in properties)
            {
                var currentPropertyValue = currentProperty.GetValue(from, null);
                currentProperty.SetValue(to, currentPropertyValue);
            }
        }
      
        private static IEnumerable<T> NormalizeCollection<T>(this IEnumerable<T> collection)
        {
            return collection ?? Enumerable.Empty<T>();
        }
    }
}
