using Microsoft.AspNetCore.Identity;
using System.Text;

namespace AnimalRescue.BusinessLogic.Extensions
{
    public static class IdentityResultExtensions
    {
        public static string GetErrors(this IdentityResult result)
        {
            var message = new StringBuilder();
            foreach (var error in result.Errors)
            {
                message.AppendLine($"{error.Description} ");
            }
            return message.ToString();
        }
    }
}
