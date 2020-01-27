using System;
using System.Collections.Generic;

namespace AnimalRescue.Infrastructure.Utilities
{
    public class EntityComparer<T> : IEqualityComparer<T>
    {
        private readonly Func<T, T, bool> _func;
        private readonly Func<T, int> _hashCodeFunc;

        public EntityComparer(Func<T, T, bool> func, Func<T, int> hashCodefunc = null)
        {
            _func = func;
            _hashCodeFunc = hashCodefunc;
        }

        public bool Equals(T entity1, T entity2)
        {
            return _func(entity1, entity2);
        }

        public int GetHashCode(T obj)
        {
            return _hashCodeFunc == null 
                ? 0 
                : _hashCodeFunc(obj);
        }
    }
}
