﻿using MongoDB.Driver;
using System;
using System.Linq.Expressions;

namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    internal interface IQueryBuilder<T>
    {
        string SortAsString(string rowSortParams);
        FilterDefinition<T> FilterAsFilterDefinition(string rowFilterParams);

        FilterDefinition<T> Where(Expression<Func<T, bool>> expression);
    }
}
