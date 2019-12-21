using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.DataAccess.Mongodb.Models;

using MongoDB.Bson.Serialization.Attributes;

using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    internal static class AliasDictionary
    {
        private static ConcurrentDictionary<Type, List<Alias>> aliasDictionary;

        static AliasDictionary()
        {
            int initialCapacity = 101;
            int numProcs = Environment.ProcessorCount;
            int concurrencyLevel = numProcs * 2;

            aliasDictionary = new ConcurrentDictionary<Type, List<Alias>>(concurrencyLevel, initialCapacity);
        }

        public static Alias GetAlias<T>(string propName)
            where T : BaseItem
        {
            Type type = typeof(T);
            if (aliasDictionary.TryGetValue(type, out var al)
                && al.FirstOrDefault(alias => alias.IsEqualNames(propName)) is Alias alias)
            {
                return alias;
            }

            var properties = typeof(T)
                .GetProperties()
                .Select(ConvertToAlias)
                .Where(x => x != null)
                .ToList();

            aliasDictionary.TryAdd(type, properties);

            return properties.FirstOrDefault(alias=> alias.IsEqualNames(propName));
        }

        private static bool IsEqualNames(this Alias alias, string propName)
        {
            return alias.AliasePropertyName.Equals(propName, StringComparison.OrdinalIgnoreCase);
        }

        private static Alias ConvertToAlias(PropertyInfo propertyInfo)
        {
            var aliasName = propertyInfo.GetCustomAttribute<CouplingPropertyNameAttribute>()?.AliasName;
            var elementName = propertyInfo.GetCustomAttribute<BsonElementAttribute>()?.ElementName;

            if (elementName == null || aliasName == null)
            {
                return null;
            }

            return new Alias
            {
                AliasePropertyName = aliasName,
                DataBasePropertyName = elementName,
                PropertyType = propertyInfo.PropertyType,
                PropertyName = propertyInfo.Name,
            };
        }
    }
}
