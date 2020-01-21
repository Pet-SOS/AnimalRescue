using System;

namespace AnimalRescue.DataAccess.Mongodb.Attributes
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
    internal class ConfigNameAttribute : Attribute
    {
        public string Name { get; set; }
        public ConfigNameAttribute(string name)
        {
            Name = name;
        }
    }
}
