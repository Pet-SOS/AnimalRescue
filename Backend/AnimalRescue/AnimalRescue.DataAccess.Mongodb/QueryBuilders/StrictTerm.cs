using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.Infrastructure.Validation;

using MongoDB.Driver;

using System.Linq;

namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    public class StrictTerm<TEntity>
    {
        private readonly string rowTermData;
        public readonly IAliasStore AliasStore;
        public Alias Alias;
        public string FieldName { get; set; }
        public string CommandName { get; set; }
        public string Content { get; set; }
        public FilterDefinition<TEntity> FilterDefinitionContent { get; }

        public StrictTerm(IAliasStore aliasStore, string rowTermData)
        {
            Require.Objects.NotNull(rowTermData, nameof(rowTermData));

            this.AliasStore = aliasStore;
            this.rowTermData = rowTermData;
        }
        public FilterDefinition<TEntity> GetDbTermFilterDefinition()
        {
            var rowTerm = rowTermData.GetRawTerm();
            Alias = AliasStore.GetAlias<TEntity>(rowTerm.field);
            var field = Alias?.DataBasePropertyName;


            Require.Strings.NotNullOrWhiteSpace<BadRequestException>(field,
                () => $"Specified field '{rowTerm.field}' for filtering data is not exist");
            Require.Booleans.IsTrue<BadRequestException>(
                StrictFilterContractConstants.AvailableRules.Any(x => x == rowTerm.command),
                () => $"Specified operator '{rowTerm.command}' for filtering data is not exist");

            CommandName = rowTerm.command;
            FieldName = field;
            Content = rowTerm.content;

            return StrictFilterContractConstants.GetFilterDefinition(this);
        }
    }
}