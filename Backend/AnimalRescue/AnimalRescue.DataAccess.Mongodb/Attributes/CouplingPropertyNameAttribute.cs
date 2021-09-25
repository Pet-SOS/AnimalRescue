using AnimalRescue.Contracts.Common.Interfaces.Attributes;

using System;

namespace AnimalRescue.DataAccess.Mongodb.Attributes
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field, AllowMultiple = false)]
    public class CouplingPropertyNameAttribute : Attribute, IAliasName
    {
        public string AliasName { get; set; }
        public bool IsMutable { get; set; }
        public bool IsPersistentName { get; set; }
        public string PersistentDataBaseName { get; }

        public CouplingPropertyNameAttribute(string name, bool isMutable = true, bool isPersistentName = false, string persistentDataBaseName = null)
        {
            AliasName = name;
            IsMutable = isMutable;
            IsPersistentName = isPersistentName;
            if(isPersistentName && string.IsNullOrWhiteSpace(persistentDataBaseName))
                throw new Exception($"if you set up isPersistentName as true than set up persistentDataBaseName");

            PersistentDataBaseName = persistentDataBaseName;
        }
    }
}
