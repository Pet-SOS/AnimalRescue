using AnimalRescue.API.Core.Configuration;
using AnimalRescue.API.Core.Responses;
using AnimalRescue.Contracts.Common.Http;
using AnimalRescue.Contracts.Common.Interfaces.Exceptions;

using Microsoft.ApplicationInsights.AspNetCore.Extensions;
using Microsoft.AspNetCore.Http;

using Newtonsoft.Json;

using System;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace AnimalRescue.API.Core.Middlewares
{
    public class UnhandledExceptionMiddleware : IMiddleware
    {
        private readonly IRuntimeConfiguration _configuration;

        public UnhandledExceptionMiddleware(IRuntimeConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception e)
            {
                await BuildExceptionResponse(context, e);
            }
        }

        private async Task BuildExceptionResponse(HttpContext context, Exception exception)
        {
            Exception currentException = exception.InnerException is IAppException
               ? exception.InnerException
               : exception;

            if (currentException is IAppException e)
            {
                await BuildExceptionResponse(context, BuildErrorResponse(context.Request, currentException, e.ErrorCode), e.HttpStatusCode);
            }
            else
            {
                await BuildExceptionResponse(context, BuildErrorResponse(context.Request, currentException), HttpStatusCode.InternalServerError);
            }
        }

        private static async Task BuildExceptionResponse(HttpContext context, string message, HttpStatusCode statusCode)
        {
            context.Response.StatusCode = (int)statusCode;
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync(message);
        }

        private static string BuildFullStackTrace(Exception e)
        {
            var builder = new StringBuilder();
            builder.AppendLine(e.Message);
            builder.AppendLine(e.StackTrace);

            Exception innEx = e.InnerException;
            while (innEx != null)
            {
                builder.AppendLine();
                builder.Append("--- Inner Exception: ");
                builder.AppendLine(innEx.Message);
                builder.AppendLine(innEx.StackTrace);
                innEx = innEx.InnerException;
            }

            return builder.ToString();
        }

        private string BuildErrorResponse(HttpRequest request, Exception e, string errorCode = ErrorCodes.UnknownError)
        {
            string self = request.GetUri().ToString();

            var response = _configuration.IncludeErrorDetails
                ? new DetailedErrorResponse<string>(errorCode, e.Message, self, BuildFullStackTrace(e))
                : new ErrorResponse<string>(errorCode, e.Message, self);

            return JsonConvert.SerializeObject(response);
        }
    }
}