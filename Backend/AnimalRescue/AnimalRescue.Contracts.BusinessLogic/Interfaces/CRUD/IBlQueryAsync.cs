﻿using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.Common.Interfaces.CRUD;
using AnimalRescue.Contracts.Common.Query;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD
{
    public interface IBlCollectinQueryAsync<TOut> : IBaseQueryAsync<BlCollectonResponse<TOut>, ApiQueryRequest>
    {
    }
    public interface IBlOneItemQueryAsync<TOut, TId> : IBaseQueryAsync<TOut, TId>
    {
    }
}
