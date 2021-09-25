using AnimalRescue.Contracts.Common.Interfaces.Attributes;

using System;

namespace AnimalRescue.Contracts.BusinessLogic.Attributes
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field, AllowMultiple = false)]
    public class CouplingPropertyDtoAttribute : Attribute, IAliasName
    {
        public string AliasName { get; set; }
        public CouplingPropertyDtoAttribute(string name)
        {
            AliasName = name;
        }
    }
}
