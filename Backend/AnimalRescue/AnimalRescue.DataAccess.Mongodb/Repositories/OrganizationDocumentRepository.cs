using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.QueryBuilders;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class OrganizationDocumentRepository : BaseCollection<OrganizationDocument>, IOrganizationDocumentRepository
    {
        public OrganizationDocumentRepository(IMongoDatabase database, IQueryBuilder<OrganizationDocument> builder)
            : base(database, builder)
        {

        }

    }
}
