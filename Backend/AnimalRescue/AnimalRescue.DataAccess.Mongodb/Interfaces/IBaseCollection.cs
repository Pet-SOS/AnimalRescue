using System.Collections.Generic;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces
{
    public interface IBaseCollection<T>
    {
        public List<T> Get();

        public T Get(string id);

        public T Create(T instance);

        public void Update(string id, T TIn);

        public void Remove(T TIn);

        public void Remove(string id);
    }
}
