using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.Infrastructure.Validation;

namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    internal class Term
    {
        public string FieldName { get; set; }
        public string CommandName { get; set; }
        public string Content { get; set; }

        public Term(string rowTermData)
        {
            Require.Objects.NotNull(rowTermData, nameof(rowTermData));

            var arr = rowTermData.Split("~");

            FieldName = arr[0];
            CommandName = arr[1];
            Content = arr[2];

            Require.Booleans.IsTrue<BadRequestException>(
                FilterContractConstants.Rulses.ContainsKey(CommandName), 
                ()=> $"Specified operator '{CommandName}' for filtering data is not exist");
        }

        public string GetDbTerm() => FilterContractConstants.Rulses[CommandName](this);
    }
}
