using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.Infrastructure.Validation;

namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    internal class Term
    {
        private readonly IAliasStore aliasStore;
        private readonly string rowTermData;

        public string FieldName { get; set; }
        public string CommandName { get; set; }
        public string Content { get; set; }

        public Term(IAliasStore aliasStore, string rowTermData)
        {
            Require.Objects.NotNull(rowTermData, nameof(rowTermData));

            this.aliasStore = aliasStore;
            this.rowTermData = rowTermData;
        }
        public string GetDbTerm<T>()
        {
            var arr = rowTermData.Split("~");
            var field = aliasStore.GetAlias<T>(arr[0])?.DataBasePropertyName;

            Require.Strings.NotNullOrWhiteSpace<BadRequestException>(field,
                () => $"Specified field '{arr[0]}' for filtering data is not exist");
            Require.Booleans.IsTrue<BadRequestException>(
                FilterContractConstants.Rulses.ContainsKey(arr[1]),
                () => $"Specified operator '{arr[1]}' for filtering data is not exist");

            FieldName = field;
            CommandName = arr[1];
            Content = arr[2];

            return FilterContractConstants.Rulses[CommandName](this);
        }
    }
}  