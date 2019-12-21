using System;

namespace AnimalRescue.DataAccess.Mongodb.Attributes
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field, AllowMultiple = false)]
    internal class CouplingPropertyNameAttribute : Attribute
    {
        public string Name { get; set; }
        public CouplingPropertyNameAttribute(string name)
        {
            Name = name;
        }
    }
}
