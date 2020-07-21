using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;

using System.Collections.Generic;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Models
{
    public interface IWellKnownTag
    {
        string Category { get; set; }

        string KindOfAnimal { get; set; }

        string Code { get; set; }

        List<LanguageValue> Values { get; set; } 
    }
}
