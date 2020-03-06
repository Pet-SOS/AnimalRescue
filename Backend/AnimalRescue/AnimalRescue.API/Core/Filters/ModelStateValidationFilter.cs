using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Linq;

namespace AnimalRescue.API.Core.Filters
{
    public class ModelStateValidationFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                var errors = GetErrors(context.ModelState);
                context.Result = new BadRequestObjectResult(errors);
            }
        }

        private string GetErrors(ModelStateDictionary modelState)
        {
            string messages = string.Join(" <br/> ", modelState.Values
                        .SelectMany(x => x.Errors)
                        .Select(x => x.ErrorMessage));
            return messages;
        }

    }
}
