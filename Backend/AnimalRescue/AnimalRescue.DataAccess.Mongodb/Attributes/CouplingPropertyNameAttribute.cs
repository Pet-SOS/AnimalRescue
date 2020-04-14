using System;

namespace AnimalRescue.DataAccess.Mongodb.Attributes
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field, AllowMultiple = false)]
    public class CouplingPropertyNameAttribute : Attribute
    {
        public string AliasName { get; set; }
        public CouplingPropertyNameAttribute(string name)
        {
            AliasName = name;
        }
    }
}
