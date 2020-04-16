using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using AnimalRescue.Infrastructure.Helpers;
using System;

namespace AnimalRescue.DataAccess.Mongodb.Extensions
{
    public static class DboExtentions
    {
        public static TDbo UpdateFrom<TDbo>(this TDbo to, TDbo from)
            where TDbo: IBaseAuditItem
        {
            foreach (var currentProperty in typeof(TDbo).GetProperties())
            {
                var currentPropertyValue = currentProperty.GetValue(from, null);
                currentProperty.SetValue(to, currentPropertyValue);
            }

            to.ModifiedAt = DateHelper.GetUtc();

            return to;
        }
    }
}
