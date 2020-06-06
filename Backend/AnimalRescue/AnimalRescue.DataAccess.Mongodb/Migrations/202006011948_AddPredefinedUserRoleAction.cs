using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Migrations.Engine;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Query;
using AnimalRescue.DataAccess.Mongodb.QueryBuilders;

using System.Linq;
using System.Threading.Tasks;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.DataAccess.Mongodb.Migrations
{
    [Migration("202006011948_AddPredefinedUserRoleAction")]
    internal class AddPredefinedUserRoleAction : IAnimalRescueMigration
    {
        private readonly IUserRoleActionRepository _userRoleActionRepository;

        public AddPredefinedUserRoleAction(IUserRoleActionRepository userRoleActionRepository)
        {
            _userRoleActionRepository = userRoleActionRepository;
        }

        public async Task Execute()
        {
            await _userRoleActionRepository.SetUpDataBaseFromJsonFileAsync<IUserRoleActionRepository, UserRoleAction>(
                "UserRoleActions.json",
                async (repo, collection) =>
                {
                    var filterArray = collection.Select(x =>
                            $"{common.Action}~{StrictFilterContractConstants.Eq}~{x.Action};" +
                            $"{common.TagId}~{StrictFilterContractConstants.Eq}~{x.TagId};" +
                            $"{common.UserRole}~{StrictFilterContractConstants.Eq}~{x.UserRole};")
                        .Select(x => "{" + x + "}")
                        .ToArray();

                    DbQuery query = new DbQuery
                    {
                        Filter = string.Join("or", filterArray),
                        Page = 1,
                        Size = 100
                    };

                    var result = await repo.GetAsync(query);

                    return result;
                },
                (repo, collection) => repo.CreateAsync(collection),
                (x, y) => x.UserRole == y.UserRole && x.Action == y.Action && x.TagId == y.TagId);
        }
    }
}