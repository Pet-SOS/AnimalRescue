using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.DataAccess.Mongodb.Query;
using baseItem = AnimalRescue.Contracts.Common.Constants.PropertyConstants.BaseItem;

namespace AnimalRescue.BusinessLogic.Extensions
{
    internal static class QueryExtensions
    {
        public static DbQuery ToDbQuery(this ApiQueryRequest apiQueryRequest)
        {
            var isNotDeletedExpr = baseItem.IsDeleted + "~eq~'false'";
            string filter = string.IsNullOrEmpty(apiQueryRequest.Filter) ? isNotDeletedExpr : isNotDeletedExpr + ";" + apiQueryRequest.Filter;

            return new DbQuery
            {
                Filter = filter,
                Page = apiQueryRequest.Page,
                Size = apiQueryRequest.Size,
                Sort = apiQueryRequest.Sort
            };
        }
    }
}
