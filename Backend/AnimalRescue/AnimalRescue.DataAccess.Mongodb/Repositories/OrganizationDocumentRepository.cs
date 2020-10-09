using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Models;

using MongoDB.Driver;

using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class OrganizationDocumentRepository : BaseRepository<OrganizationDocument>
    {
        public OrganizationDocumentRepository(IBaseCollection<OrganizationDocument> baseCollection) : base(baseCollection)
        {
        }

        public override Task DeleteAsync(string bucketId)
        {
            return baseCollection.Collection.DeleteOneAsync(x => x.BucketId == bucketId);
        }

    }
}
