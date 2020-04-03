using AnimalRescue.DataAccess.Mongodb.Attributes;

using MongoDB.Bson.Serialization.Attributes;

using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    internal class AliasStore  : IAliasStore
    {
        private ConcurrentDictionary<Type, List<Alias>> aliasDictionary;

        public AliasStore()
        {
            int initialCapacity = 101;
            int numProcs = Environment.ProcessorCount;
            int concurrencyLevel = numProcs * 2;

            aliasDictionary = new ConcurrentDictionary<Type, List<Alias>>(concurrencyLevel, initialCapacity);
        }

        public Alias GetAlias<T>(string aliasePropertyName)
        {
            Type type = typeof(T);
            if (aliasDictionary.TryGetValue(type, out var currentAlias))
            {
                return currentAlias
                    .FirstOrDefault(alias => IsEqualNames(alias, aliasePropertyName));
            }

            currentAlias = typeof(T)
                .GetProperties()
                .Select(ConvertToAlias)
                .Where(x => x != null)
                .ToList();

            aliasDictionary.TryAdd(type, currentAlias);

            return currentAlias
                .FirstOrDefault(alias => IsEqualNames(alias, aliasePropertyName));
        }

        private static bool IsEqualNames(Alias alias, string aliasePropertyName)
        {
            return alias.AliasePropertyName
                .Equals(aliasePropertyName, StringComparison.OrdinalIgnoreCase);
        }

        private static Alias ConvertToAlias(PropertyInfo propertyInfo)
        {
            var aliasName = propertyInfo.GetCustomAttribute<CouplingPropertyNameAttribute>()?.AliasName ?? propertyInfo.Name;
            var elementName = propertyInfo.GetCustomAttribute<BsonElementAttribute>()?.ElementName ?? propertyInfo.Name;

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
