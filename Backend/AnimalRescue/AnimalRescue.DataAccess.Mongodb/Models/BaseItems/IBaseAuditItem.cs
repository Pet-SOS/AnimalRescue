using System;

namespace AnimalRescue.DataAccess.Mongodb.Models.BaseItems
{
    public interface IBaseAuditItem : IBaseItem
    {
        DateTime CreatedAt { get; set; }
        DateTime? ModifiedAt { get; set; }
        string CreatedBy { get; set; }
        string ModifiedBy { get; set; }
        bool IsDeleted { get; set; }
    }
}
