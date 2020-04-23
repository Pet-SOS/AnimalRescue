using AnimalRescue.Contracts.Common.Interfaces.Attributes;

using System;

namespace AnimalRescue.DataAccess.Mongodb.Attributes
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field, AllowMultiple = false)]
    public class CouplingPropertyNameAttribute : Attribute, IAliasName
    {
        public string AliasName { get; set; }
        public bool IsMutable { get; set; }
        public CouplingPropertyNameAttribute(string name, bool isMutable = true)
        {
            AliasName = name;
            IsMutable = isMutable;
        }
    }
}
