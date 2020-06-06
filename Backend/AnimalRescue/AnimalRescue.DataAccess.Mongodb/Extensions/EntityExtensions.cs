using MongoDB.Bson.Serialization.Attributes;

using System;
using System.Linq.Expressions;
using System.Reflection;

namespace AnimalRescue.DataAccess.Mongodb.Extensions
{
    public  static class EntityExtensions
    {
        public static string GetPropertyName<T>(Expression<Func<T, object>> expression)
        {
            string name = string.Empty;
            MemberExpression memberExpression;

            if ((expression as LambdaExpression).Body is UnaryExpression)
            {
                memberExpression = ((expression as LambdaExpression).Body as UnaryExpression).Operand as MemberExpression;
            }
            else
            {
                memberExpression = (expression as LambdaExpression).Body as MemberExpression;
            }

            if (memberExpression != null)
            {
                name = (memberExpression.Member as PropertyInfo).Name;
            }

            return name;
        }

        public static string GetDatabasePropertyName<T>(Expression<Func<T, object>> expression)
        {
            string propName = GetPropertyName<T>(expression);

            string dbPropName = typeof(T)
                .GetProperty(propName)
                ?.GetCustomAttribute<BsonElementAttribute>()
                ?.ElementName;

            return dbPropName;
        }
    }
}
