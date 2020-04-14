using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using AnimalRescue.Infrastructure.Utilities;

using MongoDB.Bson.Serialization.Attributes;

using System;
using System.Collections;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    internal class AliasStore : IAliasStore
    {
        private ConcurrentDictionary<Type, List<Alias>> aliasDictionary;

        public AliasStore()
        {
            int initialCapacity = 101;
            int numProcs = Environment.ProcessorCount;
            int concurrencyLevel = numProcs * 2;

            aliasDictionary = new ConcurrentDictionary<Type, List<Alias>>(concurrencyLevel, initialCapacity);
        }

        public Alias GetAlias<T>(string aliasPropertyName)
        {
            Type type = typeof(T);

            return GetAlias(type, aliasPropertyName);
        }

        public Alias GetAlias(Type type, string aliasPropertyName)
        {
            if (aliasDictionary.TryGetValue(type, out var currentAlias))
            {
                Alias result = currentAlias
                    .FirstOrDefault(alias => IsEqualNames(alias, aliasPropertyName));

                if (result == null)
                {
                    result = FindNestedAlias(aliasPropertyName);
                }

                return result;
            }

            currentAlias = GetAliases(type);

            return currentAlias
                .FirstOrDefault(alias => IsEqualNames(alias, aliasPropertyName));
        }

        private Alias FindNestedAlias(string aliasPropertyName)
        {
            var data = aliasDictionary.Where(x => x.Value.Any(alias => IsEqualNames(alias, aliasPropertyName)));
            if(data != null)
            {
                if(data.Count() > 0)
                {
                    return data
                        .First()
                        .Value
                        .First(alias => IsEqualNames(alias, aliasPropertyName));
                }
            }

            return null; 
        }

        private List<Alias> GetAliases(Type entityType)
        {
            List<Alias> currentAlias = entityType
                .GetProperties()
                .Select(x=> ConvertToAlias(x, entityType))
                .SelectMany(AliasToListNestedAliases)
                .Where(x => x != null)
                .Distinct(new EntityComparer<Alias>(IsEqual))
                .ToList();

            aliasDictionary.TryAdd(entityType, currentAlias);

            var collections = currentAlias
                .Where(currentAlias => currentAlias.PropertyType.GetInterface(nameof(ICollection)) != null)
                .Select(currentAlias => currentAlias.PropertyType.GetGenericArguments().Single())
                .Where(t => !t.IsPrimitive && !t.IsValueType && (t.Namespace == null || !t.Namespace.StartsWith("System")))
                .ToList();

            collections.ForEach(x => GetAliases(x));

            return currentAlias;
        }

        private static bool IsEqualNames(Alias alias, string aliasPropertyName)
        {
            return alias.AliasPropertyName
                .Equals(aliasPropertyName, StringComparison.OrdinalIgnoreCase);
        }

        private static bool IsEqual(Alias x, Alias y) =>
            x.PropertyName == y.PropertyName
            && x.AliasPropertyName == y.AliasPropertyName
            && x.DataBasePropertyName == y.DataBasePropertyName;

        private static Alias ConvertToAlias(PropertyInfo propertyInfo, Type entityType)
        {
            var aliasName = propertyInfo.GetCustomAttribute<CouplingPropertyNameAttribute>()?.AliasName;
            if (aliasName == null)
            {
                return null;
            }

            var elementName = propertyInfo.GetCustomAttribute<BsonElementAttribute>()?.ElementName;
            if (elementName == null)
            {
                if(entityType.GetInterface(nameof(IApplicationExceptionFilterItem))!= null)
                {
                    elementName = propertyInfo.Name;
                }
                else
                {
                    return null;
                }
            }

            return new Alias
            {
                AliasPropertyName = aliasName,
                DataBasePropertyName = elementName,
                PropertyType = propertyInfo.PropertyType,
                PropertyName = propertyInfo.Name,
            };
        }

        private static List<Alias> AliasToListNestedAliases(Alias alias)
        {
            if (alias == null)
            {
                return new List<Alias>();
            }

            var result = new List<Alias> { alias };
            
            var propertyInfos = alias.PropertyType.GetProperties();
            foreach (PropertyInfo propertyInfo in propertyInfos)
            {
                Alias currentAlias = ConvertToAlias(propertyInfo, alias.PropertyType);

                if (currentAlias == null)
                {
                    continue;
                }

                currentAlias.AliasPropertyName = $"{alias.AliasPropertyName}.{currentAlias.AliasPropertyName}";
                currentAlias.DataBasePropertyName = $"{alias.DataBasePropertyName}.{currentAlias.DataBasePropertyName}";

                result.Add(currentAlias);
                result.AddRange(AliasToListNestedAliases(currentAlias));
            }

            return result;
        }
    }
}
