using AnimalRescue.Contracts.Common.Interfaces.CRUD;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Query;

using System.Collections.Generic;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
    public interface IDocumentCollectionRepository :
        IBaseQuerAsyncy<List<DocumentCollection>, DbQuery>,
        IBaseQuerAsyncy<DocumentCollection, string>,
        IBaseCreateAsync<DocumentCollection>,
        IBaseUpdateAsync<DocumentCollection>,
        IBaseDeleteAsync<string>
    {
    }
}
