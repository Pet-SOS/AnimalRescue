using AnimalRescue.DataAccess.Mongodb.Extensions;

using System;

namespace AnimalRescue.BusinessLogic.Extensions
{
    public static class IdExtensions
    {
        public static string GetStringId<TEId>(TEId id)
        {
            string itemId = string.Empty;

            if (id is Guid guid)
            {
                itemId = guid.AsObjectIdString();
            }
            if (Guid.TryParse(id.ToString(), out Guid guid2))
            {
                itemId = guid2.AsObjectIdString();
            }
            else
            {
                itemId = id.ToString();
            }

            return itemId;
        }

    }
}
