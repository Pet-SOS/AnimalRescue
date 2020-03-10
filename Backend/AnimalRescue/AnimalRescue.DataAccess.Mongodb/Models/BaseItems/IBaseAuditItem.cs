using System;
using System.Collections.Generic;
using System.Text;

namespace AnimalRescue.DataAccess.Mongodb.Models.BaseItems
{
    public interface IBaseAuditItem
    {
        DateTime CreatedAt { get; set; }
        DateTime? ModifiedAt { get; set; }
        string CreatedBy { get; set; }
        string ModifiedBy { get; set; }
    }
}
