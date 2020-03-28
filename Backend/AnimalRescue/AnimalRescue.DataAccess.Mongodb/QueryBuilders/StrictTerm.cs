using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.Infrastructure.Validation;

using MongoDB.Driver;
using System.Linq;

namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    internal class StrictTerm<TEntity>
    {
        private readonly IAliasStore aliasStore;
        private readonly string rowTermData;
        public Alias Alias;
        public string FieldName { get; set; }
        public string CommandName { get; set; }
        public string Content { get; set; }
        public FilterDefinition<TEntity> FilterDefinitionContent { get; }

        public StrictTerm(IAliasStore aliasStore, string rowTermData)
        {
            Require.Objects.NotNull(rowTermData, nameof(rowTermData));

            this.aliasStore = aliasStore;
            this.rowTermData = rowTermData;
        }
        public FilterDefinition<TEntity> GetDbTermFilterDefinition()
        {
            var arr = rowTermData.Split("~");
            Alias = aliasStore.GetAlias<TEntity>(arr[0]);
            var field = Alias?.DataBasePropertyName;

            Require.Strings.NotNullOrWhiteSpace<BadRequestException>(field,
                () => $"Specified field '{arr[0]}' for filtering data is not exist");
            Require.Booleans.IsTrue<BadRequestException>(
                StrictFilterContractConstants.AvailableRules.Any(x => x == arr[1]),
                () => $"Specified operator '{arr[1]}' for filtering data is not exist");

            FieldName = field;
            CommandName = arr[1];
            Content = arr[2];

            return StrictFilterContractConstants.GetFilterDefinition(this);
        }
    }
}